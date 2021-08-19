import React, { useEffect, useCallback, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { api } from '../../services/api';

import { Load } from '../../components/Load';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

interface IRent {
  period: string;
  price: number;
}

interface IAccessory {
  type: string;
  name: string;
}

interface ICar {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: IRent;
  fuel_type: string;
  thumbnail: string;
  accessories: Array<IAccessory>;
  photos: Array<string>;
}

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<ICar[]>([]);

  const handleNavigationCarDetails = useCallback(() => {
    navigation.navigate('CarDetails');
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

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item: car }) => (
            <Car
              brand={car.brand}
              name={car.name}
              rent={car.rent}
              thumbnail={car.thumbnail}
              onPress={handleNavigationCarDetails}
            />
          )}
        />
      )}
    </Container>
  );
};

export { Home };
