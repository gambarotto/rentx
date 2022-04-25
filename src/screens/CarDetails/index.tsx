import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

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
  About,
  Footer,
} from './styles';

import Button from '../../components/Button';
import { RootStackScreenProps } from '../../routes';
import getAccessoryIcon from '../../utils/getAccessoryIcon';

const CarDetails: React.FC = () => {
  const navigation = useNavigation();
  const {
    params: { car },
  } = useRoute<RootStackScreenProps<'CarDetails'>['route']>();

  const handleConfirmRental = useCallback(() => {
    navigation.navigate('Scheduling', { car });
  }, [navigation, car]);

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
            <Price>{`R$ ${car.rent.price}`}</Price>
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

        <About>{car.about}</About>
      </Content>
      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
};

export default CarDetails;
