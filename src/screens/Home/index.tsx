import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import api from '../../services/api';
import { database } from '../../database';

import { Car as ModelCar } from '../../database/model/Car';
import Logo from '../../assets/logo.svg';
import CardCar from '../../components/CardCar';
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';
import LoadAnimation from '../../components/LoadAnimation';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);
  // const synchronizing = useRef(false);

  useFocusEffect(() => {
    const backHandlerEvent = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return backHandlerEvent.remove();
  });
  const offlineSynchronize = useCallback(async () => {
    try {
      await synchronize({
        database,
        pullChanges: async ({ lastPulledAt }) => {
          const response = await api.get(
            `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`,
          );
          const { changes, latestVersion } = response.data;
          return { changes, timestamp: latestVersion };
        },
        pushChanges: async ({ changes }) => {
          const user = changes.users;
          await api.post(`/users/sync`, user);
        },
      });
    } catch (error) {
      console.log('## Home::offlineSynchronize ##:', error);
    }
  }, []);
  useEffect(() => {
    let synchronizing = false;
    const syncChanges = async (): Promise<void> => {
      if (netInfo.isConnected === true && !synchronizing) {
        synchronizing = true;
        try {
          offlineSynchronize();
        } catch (error) {
          console.log('## Home::syncChanges ##:', error);
        }
      }
    };
    syncChanges();
    return () => {
      synchronizing = false;
    };
  }, [netInfo.isConnected, offlineSynchronize]);
  useEffect(() => {
    let isMounted = true;
    async function fetchCars(): Promise<void> {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const carsLocal = await carCollection.query().fetch();
        if (isMounted) {
          setCars(carsLocal);
        }
      } catch (error) {
        console.log('## Home::fetchCars ##:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCarDetails = useCallback(
    (car: ModelCar) => {
      navigation.navigate('CarDetails', { car });
    },
    [navigation],
  );

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardCar data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
};

export default Home;
