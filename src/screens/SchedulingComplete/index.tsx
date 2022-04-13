import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import ConfirmButton from '../../components/ConfirmButton';

import { Container, Content, Title, Message, Footer } from './styles';

const SchedulingComplete: React.FC = () => {
  const { width } = useWindowDimensions();
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
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até uma concessionária da RENTX {'\n'}
          pegar o seu automovel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="ok" />
      </Footer>
    </Container>
  );
};

export default SchedulingComplete;
