import React, { useCallback, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Alert, StatusBar } from 'react-native';
import { format } from 'date-fns';

import BackButton from '../../components/BackButton';
import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';
import Button from '../../components/Button';
import Calendar, {
  DayProps,
  generateInterval,
  MarkedDateProps,
} from '../../components/Calendar';
import { getDateAdjusted } from '../../utils/getDateAdjusted';
import { RootStackScreenProps } from '../../routes';

interface RentalPeriod {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
}

const Scheduling: React.FC = () => {
  const [lastSelectedDay, setLastSelectedDay] = useState<DayProps>(
    {} as DayProps,
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps,
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod,
  );
  const theme = useTheme();
  const navigation = useNavigation();
  const {
    params: { car },
  } = useRoute<RootStackScreenProps<'Scheduling'>['route']>();

  const handleConfirmRental = useCallback(() => {
    if (!rentalPeriod.start || !rentalPeriod.end) {
      Alert.alert('Selecione o intervalo para alugar');
      return;
    }
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    });
  }, [car, markedDates, navigation, rentalPeriod.end, rentalPeriod.start]);

  const handleChangeDate = useCallback(
    (date: DayProps) => {
      let start = !lastSelectedDay.timestamp ? date : lastSelectedDay;
      let end = date;

      if (start.timestamp > end.timestamp) {
        start = end;
        end = start;
      }
      setLastSelectedDay(end);
      const interval = generateInterval(start, end);
      setMarkedDates(interval);

      const firstDate = Object.keys(interval)[0];
      const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

      setRentalPeriod({
        start: start.timestamp,
        startFormatted: format(
          getDateAdjusted(new Date(firstDate)),
          'dd/MM/yyyy',
        ),
        end: end.timestamp,
        endFormatted: format(getDateAdjusted(new Date(endDate)), 'dd/MM/yyyy'),
      });
    },
    [lastSelectedDay],
  );
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton color={theme.colors.shape} />
        <Title>
          Escolha uma {'\n'}data de início e {'\n'}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>
      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
};

export default Scheduling;
