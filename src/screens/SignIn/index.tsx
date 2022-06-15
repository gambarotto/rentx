import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';
import Button from '../../components/Button';
import { Container, Header, SubTitle, Title, Form, Footer } from './styles';
import { useAuth } from '../../hooks/auth';

const SignIn: React.FC = () => {
  const theme = useTheme();
  const { navigate } = useNavigation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = useCallback(async () => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um email válido')
          .required('O e-mail é obrigatório'),
        password: Yup.string().required('Digite sua senha'),
      });

      await schema.validate({ email, password });

      signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        console.log(error);

        Alert.alert(
          'Erro na Autenticação',
          'Por favor, verifique suas credenciais',
        );
      }
    }
  }, [email, password, signIn]);

  const handleNewAccount = useCallback(async () => {
    navigate('SignUpFirstStep');
  }, [navigate]);

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setPassword}
              value={password}
            />
          </Form>
          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled
              loading={false}
            />
            <Button
              title="Criar uma conta gratuita"
              color={theme.colors.background_secondary}
              light
              onPress={handleNewAccount}
              enabled
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
