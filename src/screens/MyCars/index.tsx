import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { format, parseISO } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import CardCar from '../../components/CardCar';
import LoadAnimation from '../../components/LoadAnimation';
import api from '../../services/api';
import { Car as ModelCar } from '../../database/model/Car';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appoinntments,
  AppoinntmentsTitle,
  AppoinntmentsQuantity,
  CarList,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

export interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

const MyCars: React.FC = () => {
  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const screenIsFocus = useIsFocused();

  useEffect(() => {
    async function fetchCars(): Promise<void> {
      try {
        const response = await api.get('/rentals');
        const dataFormatted = response.data.map((data: DataProps) => ({
          id: data.id,
          car: data.car,
          start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
          end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
        }));
        setCars(dataFormatted);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, [screenIsFocus]);
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton color={theme.colors.shape} />
        <Title>
          Escolha uma {'\n'}data de início e {'\n'}fim do aluguel
        </Title>
        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appoinntments>
            <AppoinntmentsTitle>Carros Alugados</AppoinntmentsTitle>
            <AppoinntmentsQuantity>{cars.length}</AppoinntmentsQuantity>
          </Appoinntments>

          <CarList
            data={cars}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <CarWrapper>
                <CardCar data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 11 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
};

export default MyCars;
