import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';
import {
  Container,
  IconContainer,
  InputText,
  ChangePasswordVisibilityButton,
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

const PasswordInput: React.FC<Props> = ({ iconName, ...rest }) => {
  const theme = useTheme();
  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconContainer>
      <InputText {...rest} />
      <ChangePasswordVisibilityButton>
        <IconContainer>
          <Feather name="eye" size={24} color={theme.colors.text_detail} />
        </IconContainer>
      </ChangePasswordVisibilityButton>
    </Container>
  );
};

export default PasswordInput;
