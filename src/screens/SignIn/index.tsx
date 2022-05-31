import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';
import Button from '../../components/Button';
import { Container, Header, SubTitle, Title, Form, Footer } from './styles';

const SignIn: React.FC = () => {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <Title>Estamos{'\n'}quase lá.</Title>
        <SubTitle>
          Faça seu login para começar{'\n'}uma experiência incrível.
        </SubTitle>
      </Header>
      <Form>
        <Input
          iconName="mail"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <PasswordInput
          iconName="lock"
          placeholder="Senha"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </Form>
      <Footer>
        <Button
          title="Login"
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
        <Button
          title="Criar uma conta gratuita"
          color={theme.colors.background_secondary}
          light
          onPress={() => {}}
          enabled
          loading={false}
        />
      </Footer>
    </Container>
  );
};

export default SignIn;
