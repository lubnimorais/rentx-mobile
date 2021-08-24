import React, { useEffect, useCallback, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from 'styled-components';

import { Ionicons } from '@expo/vector-icons';

import { api } from '../../services/api';

import { Load } from '../../components/Load';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import { ICarDTO } from '../../dtos/ICarDTO';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton,
} from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<ICarDTO[]>([]);

  const handleNavigationCarDetails = useCallback(
    (car: ICarDTO) => {
      navigation.navigate('CarDetails', { car });
    },
    [navigation],
  );

  const handleOpenMyCars = useCallback(() => {
    navigation.navigate('MyCars');
  }, [navigation]);

  const fetchCars = useCallback(async () => {
    try {
      const response = await api.get('/cars');

      setCars(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

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

          <TotalCars>{`Total de ${cars.length} carros`}</TotalCars>
        </HeaderContent>
      </Header>

      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item: car }) => (
            <Car car={car} onPress={() => handleNavigationCarDetails(car)} />
          )}
        />
      )}

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </MyCarsButton>
    </Container>
  );
};

export { Home };
