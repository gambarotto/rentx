import React from 'react';
import BackButton from '../../components/BackButton';
import Accessory from '../../components/Accessory';
import ImageSlider from '../../components/ImageSlider';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer,
} from './styles';
import Button from '../../components/Button';

const CarDetails: React.FC = () => (
  <Container>
    <Header>
      <BackButton />
    </Header>
    <CarImages>
      <ImageSlider
        imagesUrl={['https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png']}
      />
    </CarImages>

    <Content>
      <Details>
        <Description>
          <Brand>Audi</Brand>
          <Name>RS 5 Coupé</Name>
        </Description>

        <Rent>
          <Period>Ao dia</Period>
          <Price>R$ 580,00</Price>
        </Rent>
      </Details>
      <Accessories>
        <Accessory name="380km/s" icon={speedSvg} />
        <Accessory name="3.2s" icon={accelerationSvg} />
        <Accessory name="800 HP" icon={forceSvg} />
        <Accessory name="Gasolina" icon={gasolineSvg} />
        <Accessory name="Auto" icon={exchangeSvg} />
        <Accessory name="2 pessoas" icon={peopleSvg} />
      </Accessories>

      <About>
        Este é um automóvel desportivo. Surgiu do lendário touro de lide
        indultado na praça Real Maestranza de Sevilla. É um belíssimo carro para
        quem gosta de acelerar.
      </About>
    </Content>
    <Footer>
      <Button title="Confirmar" />
    </Footer>
  </Container>
);

export default CarDetails;
