import React, { useCallback, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';

import { Alert } from 'react-native';
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

const SchedulingDetails: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const navigation = useNavigation();
  const {
    params: { car, dates, rentalPeriod },
  } = useRoute<RootStackScreenProps<'SchedulingDetails'>['route']>();

  const handleConfirmRental = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/schedules_bycars/${car.id}`);

      const unavailable_dates = [...response.data.unavailable_dates, ...dates];

      await api.post('/schedules_byuser', {
        user_id: 1,
        car,
        startDate: rentalPeriod.startFormatted,
        endDate: rentalPeriod.endFormatted,
      });
      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
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
  }, [
    car,
    dates,
    navigation,
    rentalPeriod.endFormatted,
    rentalPeriod.startFormatted,
  ]);

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

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
              {`R$ ${car.rent.price} x${dates.length} diárias`}
            </RentalPriceQuota>
            <RentalPriceTotal>
              R$ {Number(car.rent.price * dates.length)}
            </RentalPriceTotal>
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
