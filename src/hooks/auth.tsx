import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
}
interface AuthState {
  token: string;
  user: User;
}
interface SighInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: User;
  // eslint-disable-next-line no-unused-vars
  signIn: (credentials: SighInCredentials) => Promise<void>;
}
interface AuthProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  const signIn = useCallback(async ({ email, password }: SighInCredentials) => {
    const response = await api.post('/sessions', { email, password });
    if (response.data) {
      const { token, user } = response.data;
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      setData({ token, user });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
