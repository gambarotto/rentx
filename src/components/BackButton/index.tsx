import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from 'styled-components';
import { TouchableOpacityProps } from 'react-native';
import { Container } from './styles';

interface Props extends TouchableOpacityProps {
  color?: string;
}
const BackButton: React.FC<Props> = ({ color, ...rest }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container onPress={handleGoBack} {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color || theme.colors.text}
      />
    </Container>
  );
};

export default BackButton;
