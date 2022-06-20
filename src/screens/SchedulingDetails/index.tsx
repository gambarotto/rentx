import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';

import { Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import BackButton from '../../components/BackButton';
import Accessory from '../../components/Accessory';
import ImageSlider from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';
import Button from '../../components/Button';
import { RootStackScreenProps } from '../../routes';
import getAccessoryIcon from '../../utils/getAccessoryIcon';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { CarDTO } from '../../dtos/CarDTO';

const SchedulingDetails: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const {
    params: { car, dates, rentalPeriod },
  } = useRoute<RootStackScreenProps<'SchedulingDetails'>['route']>();

  const [loading, setLoading] = useState(false);
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const rentTotal = Number(car.price * dates.length);

  const handleConfirmRental = useCallback(async () => {
    setLoading(true);
    try {
      await api.post('rentals', {
        user_id: user.id,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      });
      navigation.navigate('Confirmation', {
        title: 'Carro Alugado com sucesso!',
        message: `Agora você só precisa ir\naté uma concessionária da RENTX\npegar o seu automovel.`,
        nextScreenRoute: 'Home',
      });
    } catch (error) {
      console.log(error);
      setLoading(false);

      Alert.alert('Não foi possível confirmar o agendamento');
    }
  }, [car.id, dates, navigation, rentTotal, user.id]);
  useEffect(() => {
    const fetchCarUpdated = async (): Promise<void> => {
      const response = await api.get(`/cars/${car.id}`);
      if (response.data) {
        setCarUpdated(response.data);
      }
    };
    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [car.id, netInfo.isConnected]);
  return (
    <Container>
      <Header>
        <BackButton />
      </Header>
      <CarImages>
        <ImageSlider
          imagesUrl={
            carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>
        {carUpdated.accessories && (
          <Accessories>
            {carUpdated.accessories.map((accessory) => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        )}

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              {`R$ ${car.price} x${dates.length} diárias`}
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          enabled={!loading}
          loading={loading}
          onPress={handleConfirmRental}
          title="Alugar agora"
          color={theme.colors.success}
        />
      </Footer>
    </Container>
  );
};

export default SchedulingDetails;
