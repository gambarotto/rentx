import { Feather } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useCallback, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ImagePickerResult,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { RectButton } from 'react-native-gesture-handler';
import BackButton from '../../components/BackButton';
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  Content,
  Options,
  Option,
  OptionTitle,
  Sessions,
} from './styles';
import Button from '../../components/Button';

type OptionsProps = 'dataEdit' | 'passwordEdit';
interface ImagePickerCustom extends ImagePickerResult {
  cancelled: boolean;
  height: number;
  type: string;
  uri: string;
  width: number;
}
const Profile: React.FC = () => {
  const theme = useTheme();
  const { user, signOut, updateUser } = useAuth();

  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);
  const [option, setOption] = useState<OptionsProps>('dataEdit');

  const handleOptionChange = useCallback((optionChoice: OptionsProps) => {
    setOption(optionChoice);
  }, []);
  const handleAvatarSelect = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      const { uri } = result as ImagePickerCustom;

      setAvatar(uri);
    }
  }, []);
  const handleUpdateProfile = useCallback(async () => {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('A CNH é obrigatória'),
        name: Yup.string().required('Nome é obrigatório'),
      });
      await schema.validate({ name, driverLicense });
      await updateUser({
        ...user,
        name,
        driver_license: driverLicense,
        avatar,
      });
      Alert.alert('Perfil atualizado');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert('Não foi possivel atuaizar o perfil');
      }
    }
  }, [avatar, driverLicense, name, updateUser, user]);
  const handleSignOut = useCallback(() => {
    Alert.alert(
      'Tem certeza?',
      'Se você sair precisa-rá de internet para conectar-se novamente',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => signOut(),
          style: 'default',
        },
      ],
    );
  }, [signOut]);
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }} />}
              <RectButton
                onPress={handleAvatarSelect}
                style={[
                  styles.photoButton,
                  { backgroundColor: theme.colors.main },
                ]}
              >
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </RectButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                onPress={() => handleOptionChange('dataEdit')}
                active={option === 'dataEdit'}
              >
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option
                onPress={() => handleOptionChange('passwordEdit')}
                active={option === 'passwordEdit'}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            {option === 'dataEdit' ? (
              <Sessions>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCapitalize="words"
                  defaultValue={user.name}
                  onChangeText={setName}
                  value={name}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                  value={driverLicense}
                />
              </Sessions>
            ) : (
              <Sessions>
                <PasswordInput iconName="lock" placeholder="Senha" />
                <PasswordInput iconName="lock" placeholder="Nova senha" />
                <PasswordInput iconName="lock" placeholder="Senha" />
              </Sessions>
            )}
            <Button title="Salvar alterações" onPress={handleUpdateProfile} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  photoButton: {
    width: 40,
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
export default Profile;
