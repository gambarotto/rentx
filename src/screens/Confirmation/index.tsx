import React, { useCallback } from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import ConfirmButton from '../../components/ConfirmButton';

import { Container, Content, Title, Message, Footer } from './styles';
import { RootStackScreenProps } from '../../routes';

const Confirmation: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const {
    params: { title, message, nextScreenRoute },
  } = useRoute<RootStackScreenProps<'Confirmation'>['route']>();

  const handleNextScreen = useCallback(() => {
    navigation.navigate(nextScreenRoute);
  }, [navigation, nextScreenRoute]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="ok" onPress={handleNextScreen} />
      </Footer>
    </Container>
  );
};

export default Confirmation;
