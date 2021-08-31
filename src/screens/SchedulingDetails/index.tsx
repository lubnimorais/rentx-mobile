import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import { format } from 'date-fns';

import { api } from '../../services/api';

import { ICarDTO } from '../../dtos/ICarDTO';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

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
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';

interface IRentalPeriod {
  start: string;
  end: string;
}

interface IRouteProps {
  car: ICarDTO;
  dates: Array<string>;
}

const SchedulingDetails: React.FC = () => {
  const route = useRoute();
  const { car, dates } = route.params as IRouteProps;

  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>(
    {} as IRentalPeriod,
  );
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const theme = useTheme();

  const rentalTotal = useMemo(() => {
    return Number(dates.length) * car.rent.price;
  }, [car.rent.price, dates.length]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleNavigationSchedulingComplete = useCallback(async () => {
    setLoading(true);

    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    await api.post(`/schedules_byuser`, {
      user_id: 1,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyy'),
      endDate: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyy',
      ),
    });

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() => {
        navigation.navigate('Confirmation', {
          title: 'Carro alugado',
          message: `Agora você só precisa ir
            ${'\n'}até a concessionária da RENTX${'\n'}pegar seu automóvel`,
          nextScreenRoute: 'Home',
        });
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('Não foi possível confirmar o agendamento');
      });
  }, [navigation, car, dates]);

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyy'),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyy',
      ),
    });
  }, [dates]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(24)}
            color={theme.colors.shape}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              {`R$ ${car.rent.price} x${dates.length} diárias`}
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleNavigationSchedulingComplete}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
};

export { SchedulingDetails };
