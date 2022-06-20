import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNetInfo } from '@react-native-community/netinfo';
import BackButton from '../../components/BackButton';
import Accessory from '../../components/Accessory';
import ImageSlider from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  OfflineInfo,
  Footer,
} from './styles';

import Button from '../../components/Button';
import { RootStackScreenProps } from '../../routes';
import getAccessoryIcon from '../../utils/getAccessoryIcon';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

const CarDetails: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const netInfo = useNetInfo();
  const scrollY = useSharedValue(0);

  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const scrollYHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const headerStyleAnimation = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 200], [200, 90], Extrapolate.CLAMP),
  }));
  const sliderCarsStyleAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 120], [1, 0], Extrapolate.CLAMP),
  }));
  const {
    params: { car },
  } = useRoute<RootStackScreenProps<'CarDetails'>['route']>();

  const handleConfirmRental = useCallback(() => {
    navigation.navigate('Scheduling', { car });
  }, [navigation, car]);

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
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary },
        ]}
      >
        <Header>
          <BackButton />
        </Header>
        <Animated.View style={[sliderCarsStyleAnimation]}>
          <CarImages>
            <ImageSlider
              imagesUrl={
                carUpdated.photos
                  ? carUpdated.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollYHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>{`R$ ${
              netInfo.isConnected === true ? car.price : '...'
            }`}</Price>
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

        <About>{car.about}</About>
      </Animated.ScrollView>
      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
          enabled={netInfo.isConnected === true}
        />
        {netInfo.isConnected === false && (
          <OfflineInfo>
            Conecte-se a internet para ver mais detalhes e agendar seu carro
          </OfflineInfo>
        )}
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
});

export default CarDetails;
