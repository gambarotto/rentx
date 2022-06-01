import React, { useCallback, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import Bullet from '../../../components/Bullet';
import BackButton from '../../../components/BackButton';
import Input from '../../../components/Input';
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

const SignUpFirstStep: React.FC = () => {
  const { navigate } = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const handleNextStep = useCallback(async () => {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('A CNH é obrigatória'),
        email: Yup.string()
          .email('Digite um email válido')
          .required('O e-mail é obrigatório'),
        name: Yup.string().required('Nome é obrigatório'),
      });
      const data = { name, email, driverLicense };
      await schema.validate(data);
      navigate('SignUpSecondStep', { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Erro na Autenticação',
          'Por favor, verifique suas credenciais',
        );
      }
    }
  }, [driverLicense, email, name, navigate]);

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
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              autoCapitalize="words"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>
          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpFirstStep;
