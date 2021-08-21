import React, { useCallback, useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { format } from 'date-fns';

import { ICar } from '../../dtos/ICarDTO';

import { getPlatformDate } from '../../utils/getPlatformDate';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import {
  Calendar,
  IMarkedDateProps,
  IDayProps,
  generateInterval,
} from '../../components/Calendar';

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

interface IRentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface IRouteProps {
  car: ICar;
}

const Scheduling: React.FC = () => {
  const route = useRoute();
  const { car } = route.params as IRouteProps;

  const navigation = useNavigation();
  const theme = useTheme();

  const [lastSelectedDate, setLastSelectedDate] = useState<IDayProps>(
    {} as IDayProps,
  );
  const [markedDates, setMarkedDates] = useState<IMarkedDateProps>(
    {} as IMarkedDateProps,
  );
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>(
    {} as IRentalPeriod,
  );

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleNavigationSchedulingDetails = useCallback(() => {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert('Selecione o intervalo para alugar');
    } else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates),
      });
    }
  }, [
    navigation,
    car,
    markedDates,
    rentalPeriod.startFormatted,
    rentalPeriod.endFormatted,
  ]);

  const handleChangeDate = useCallback(
    (date: IDayProps) => {
      let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
      let end = date;

      if (start.timestamp > end.timestamp) {
        start = end;
        end = start;
      }

      setLastSelectedDate(end);

      const interval = generateInterval(start, end);
      setMarkedDates(interval);

      const firstDate = Object.keys(interval)[0];
      const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

      setRentalPeriod({
        startFormatted: format(
          getPlatformDate(new Date(firstDate)),
          'dd/MM/yyyy',
        ),
        endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
      });
    },
    [lastSelectedDate],
  );

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton color={theme.colors.shape} onPress={handleBack} />

        <Title>
          Escolha uma {'\n'}
          data de inicio {'\n'}e fim do aluguel
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
            <DateTitle>ATÉ</DateTitle>
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
        <Button title="Confirmar" onPress={handleNavigationSchedulingDetails} />
      </Footer>
    </Container>
  );
};

export { Scheduling };
