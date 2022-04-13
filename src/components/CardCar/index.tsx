import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import GasolineSVG from '../../assets/gasoline.svg';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

interface CarData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
}

interface Props extends RectButtonProps {
  data: CarData;
}
const CardCar: React.FC<Props> = ({ data, ...rest }) => (
  <Container {...rest}>
    <Details>
      <Brand>{data.brand}</Brand>
      <Name>{data.name}</Name>

      <About>
        <Rent>
          <Period>{data.rent.period}</Period>
          <Price>{`R$ ${data.rent.price}`}</Price>
        </Rent>

        <Type>
          <GasolineSVG />
        </Type>
      </About>
    </Details>

    <CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
  </Container>
);

export default CardCar;