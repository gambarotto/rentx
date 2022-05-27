import React from 'react';
import LottieView from 'lottie-react-native';
import loadindCar from '../../assets/load_car.json';

import { Container } from './styles';

const LoadAnimation: React.FC = () => (
  <Container>
    <LottieView
      source={loadindCar}
      autoPlay
      style={{ height: 120 }}
      resizeMode="contain"
      loop
    />
  </Container>
);

export default LoadAnimation;
