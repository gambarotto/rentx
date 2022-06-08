/* eslint-disable no-unused-vars */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from './app.stack.routes';
import { useAuth } from '../hooks/auth';
import AppTabRoutes, { TabParamList } from './app.tab.routes';
import AuthRoutes, { AuthParamList } from './auth.routes';

const Routes: React.FC = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export default Routes;

type ScreensRoutesProps = AuthParamList & TabParamList & StackParamList;

export type RootStackScreenProps<T extends keyof ScreensRoutesProps> =
  StackScreenProps<ScreensRoutesProps, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ScreensRoutesProps {}
  }
}
