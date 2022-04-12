import React from 'react';
import { Container, Title } from './styles';

interface Props {
  title: string;
  color?: string;
}

const Button: React.FC<Props> = ({ title, color, ...rest }) => (
  <Container color={color} {...rest}>
    <Title>{title}</Title>
  </Container>
);

export default Button;
