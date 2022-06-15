import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import CarDetails from '../screens/CarDetails';
import Scheduling from '../screens/Scheduling';
import SchedulingDetails from '../screens/SchedulingDetails';
import Confirmation from '../screens/Confirmation';

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}
interface CarModelCustom {
  id: string;
  name: string;
  brand: string;
  about: string;
  fuel_type: string;
  period: string;
  thumbnail: string;
  price: number;
}
export type StackParamList = {
  Home: undefined;
  CarDetails: { car: CarModelCustom };
  Scheduling: { car: CarModelCustom };
  SchedulingDetails: {
    car: CarModelCustom;
    dates: string[];
    rentalPeriod: RentalPeriod;
  };
  Confirmation: {
    title: string;
    message: string;
    nextScreenRoute: any;
  };
};

const { Navigator, Screen } = createStackNavigator<StackParamList>();

const AppStackRoutes: React.FC = () => (
  <Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="Home" component={Home} />
    <Screen name="CarDetails" component={CarDetails} />
    <Screen name="Scheduling" component={Scheduling} />
    <Screen name="SchedulingDetails" component={SchedulingDetails} />
    <Screen name="Confirmation" component={Confirmation} />
  </Navigator>
);
export default AppStackRoutes;
