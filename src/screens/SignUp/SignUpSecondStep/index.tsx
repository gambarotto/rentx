import React, { useCallback, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import Bullet from '../../../components/Bullet';
import BackButton from '../../../components/BackButton';
import PasswordInput from '../../../components/PasswordInput';
import Button from '../../../components/Button';
import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';
import { RootStackScreenProps } from '../../../routes';
import api from '../../../services/api';

const SignUpSecondStep: React.FC = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const theme = useTheme();
  const { navigate } = useNavigation();
  const {
    params: {
      user: { name, email, driverLicense },
    },
  } = useRoute<RootStackScreenProps<'SignUpSecondStep'>['route']>();

  // eslint-disable-next-line consistent-return
  const handleCreateAccount = useCallback(async () => {
    if (!password || !passwordConfirm) {
      return Alert.alert('Inorme o password e confirme');
    }
    if (password !== passwordConfirm) {
      return Alert.alert('As senhas não conferem');
    }
    try {
      await api.post('/users', {
        name,
        email,
        driver_license: driverLicense,
        password,
      });
      navigate('Confirmation', {
        title: 'Conta Criada!',
        message: `Agora é só fazer login\ne aproveitar`,
        nextScreenRoute: 'SignIn',
      });
    } catch (error) {
      Alert.alert('Opa', 'não foi possível cadastrar');
    }
  }, [driverLicense, email, name, navigate, password, passwordConfirm]);

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>
          <Title>Crie sua{'\n'}conta.</Title>
          <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil.</SubTitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              autoCapitalize="none"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir Senha"
              autoCapitalize="none"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>
          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleCreateAccount}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpSecondStep;
