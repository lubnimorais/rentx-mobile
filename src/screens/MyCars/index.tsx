import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import { useTheme } from 'styled-components';

import { format, parseISO } from 'date-fns';
import { api } from '../../services/api';

import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { LoadAnimated } from '../../components/LoadAnimation';

import { ICarDTO } from '../../dtos/ICarDTO';
import { Car as CarModel } from '../../database/model/Car';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  AppointmentsList,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

interface ICarProps {
  id: string;
  car: CarModel;
  start_date: string;
  end_date: string;
}

const MyCars: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const [cars, setCars] = useState<ICarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      async function fetchCars() {
        try {
          const response = await api.get(`/rentals`);
          const dataFormatted = response.data.map((data: ICarProps) => {
            return {
              id: data.id,
              car: data.car,
              start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
              end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
            };
          });

          setCars(dataFormatted);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      fetchCars();
    }, []),
  );

  // useEffect(() => {

  // }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton color={theme.colors.shape} onPress={handleBack} />

        <Title>Seus agendamentos estão aqui</Title>

        <Subtitle>Conforto, segurança e praticidade</Subtitle>
      </Header>

      {loading ? (
        <LoadAnimated />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>
              {cars.length.toString().padStart(2, '0')}
            </AppointmentsQuantity>
          </Appointments>

          <AppointmentsList
            showsVerticalScrollIndicator={false}
            data={cars}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car car={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
};

export { MyCars };
