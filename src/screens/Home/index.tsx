import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigationCarDetails = useCallback(() => {
    navigation.navigate('CarDetails');
  }, [navigation]);

  const carData = {
    brand: 'AUDI',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 120,
    },
    thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
  };

  const carDataTwo = {
    brand: 'Porsche',
    name: 'Panamera',
    rent: {
      period: 'Ao dia',
      price: 340,
    },
    thumbnail:
      'https://www.pngkit.com/png/full/237-2375888_porsche-panamera-s.png',
  };

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

      <CarList
        data={[carData]}
        keyExtractor={item => item.name}
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
    </Container>
  );
};

export { Home };
