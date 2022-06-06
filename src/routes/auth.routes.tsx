import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../screens/SignIn';
import Splash from '../screens/Splash';
import Confirmation from '../screens/Confirmation';
import SignUpFirstStep from '../screens/SignUp/SignUpFirstStep';
import SignUpSecondStep from '../screens/SignUp/SignUpSecondStep';

export type AuthParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: {
    user: { name: string; email: string; driverLicense: string };
  };
  Confirmation: {
    title: string;
    message: string;
    nextScreenRoute: any;
  };
};

const { Navigator, Screen } = createStackNavigator<AuthParamList>();

const AuthRoutes: React.FC = () => (
  <Navigator
    initialRouteName="Splash"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="Splash" component={Splash} />
    <Screen name="SignIn" component={SignIn} />
    <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
    <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
    <Screen name="Confirmation" component={Confirmation} />
  </Navigator>
);
export default AuthRoutes;
