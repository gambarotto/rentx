import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

const Button: React.FC<Props> = ({
  title,
  loading = false,
  light = false,
  ...rest
}) => {
  const theme = useTheme();
  Object.assign(rest, { loading });

  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
};
export default Button;
