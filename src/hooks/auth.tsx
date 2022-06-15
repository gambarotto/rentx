/* eslint-disable no-unused-vars */
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { database } from '../database';
import api from '../services/api';
import { User as ModelUser } from '../database/model/User';

interface User {
  id: string;
  user_id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  token: string;
}
interface SighInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: User;
  signIn: (credentials: SighInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  loading: boolean;
}
interface AuthProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [data, setData] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadUserData = async (): Promise<void> => {
      try {
        console.log('## useAuth ##: sync user');

        const userCollection = database.get<ModelUser>('users');
        const response = await userCollection.query().fetch();

        if (response.length > 0) {
          // eslint-disable-next-line no-underscore-dangle
          const userData = response[0]._raw as unknown as User;
          api.defaults.headers.common.authorization = `Bearer ${userData.token}`;
          if (isMounted) {
            setData(userData);
          }
        }
      } catch (error) {
        console.log('## useAuth ##: error fetching user data', error);
      }
    };
    loadUserData();
    setLoading(false);
    return () => {
      isMounted = false;
    };
  }, []);

  const signIn = useCallback(async ({ email, password }: SighInCredentials) => {
    try {
      const response = await api.post('/sessions', { email, password });
      if (response.data) {
        const { token, user } = response.data;
        api.defaults.headers.common.authorization = `Bearer ${token}`;

        const userCollection = database.get<ModelUser>('users');
        await database.write(async () => {
          await userCollection.create((newUser) => {
            newUser.user_id = user.id;
            newUser.name = user.name;
            newUser.email = user.email;
            newUser.driver_license = user.driver_license;
            newUser.avatar = user.avatar;
            newUser.token = token;
          });
        });
        setData({ token, ...user });
      }
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });
      setData({} as User);
    } catch (error) {
      throw new Error(error);
    }
  }, [data.id]);

  const updateUser = useCallback(
    async (user: User) => {
      try {
        const userCollection = database.get<ModelUser>('users');
        await database.write(async () => {
          const userSelected = await userCollection.find(data.id);
          await userSelected.update((dataUser) => {
            dataUser.name = user.name;
            dataUser.driver_license = user.driver_license;
            dataUser.avatar = user.avatar;
          });
        });
        setData(user);
      } catch (error) {
        throw new Error(error);
      }
    },
    [data.id],
  );
  return (
    <AuthContext.Provider
      value={{ user: data, signIn, signOut, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
