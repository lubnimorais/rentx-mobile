import React, { useEffect, useCallback, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useNetInfo } from '@react-native-community/netinfo';

import { api } from '../../services/api';

import { LoadAnimated } from '../../components/LoadAnimation';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import { ICarDTO } from '../../dtos/ICarDTO';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const netInfo = useNetInfo();

  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<ICarDTO[]>([]);

  const handleNavigationCarDetails = useCallback(
    (car: ICarDTO) => {
      navigation.navigate('CarDetails', { car });
    },
    [navigation],
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get('/cars');

        if (isMounted) {
          setCars(response.data);
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
    if (netInfo.isConnected) {
      Alert.alert('Você está On-line');
    } else {
      Alert.alert('Você está Off-line');
    }
  }, [netInfo.isConnected]);

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
