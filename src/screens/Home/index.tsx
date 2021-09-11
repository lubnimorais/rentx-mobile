import React, { useEffect, useCallback, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useNetInfo } from '@react-native-community/netinfo';

import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';

import { Car as CarModel } from '../../database/models/Car';

import { api } from '../../services/api';

import { LoadAnimated } from '../../components/LoadAnimation';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const netInfo = useNetInfo();

  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<CarModel[]>([]);

  const handleNavigationCarDetails = useCallback(
    (car: CarModel) => {
      navigation.navigate('CarDetails', { car });
    },
    [navigation],
  );

  const offlineSynchronize = useCallback(async () => {
    // lastPulledAt -> timestamp de quando ocorreu a última atualização
    // changes -> quais mudanças ocorreram no dispositivo para enviar para o backend

    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`,
        );

        const { changes, latestVersion } = response.data;

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('users/sync', user);
      },
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<CarModel>('cars');
        const carsDatabase = await carCollection.query().fetch();

        if (isMounted) {
          setCars(carsDatabase);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected, offlineSynchronize]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          {!loading && (
            <TotalCars>{`Total de ${cars.length} carros`}</TotalCars>
          )}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimated />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item: car }) => (
            <Car car={car} onPress={() => handleNavigationCarDetails(car)} />
          )}
        />
      )}
    </Container>
  );
};

export { Home };
