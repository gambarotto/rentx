/* eslint-disable no-unused-vars */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import StackRoutes, { StackParamList } from './stack.routes';

const Routes: React.FC = () => (
  <NavigationContainer>
    <StackRoutes />
  </NavigationContainer>
);

export default Routes;

export type RootStackScreenProps<T extends keyof StackParamList> =
  StackScreenProps<StackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
