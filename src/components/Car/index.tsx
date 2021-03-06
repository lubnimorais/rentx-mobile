import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { useNetInfo } from '@react-native-community/netinfo';

import { Car as CarModel } from '../../database/model/Car';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

interface IProps extends RectButtonProps {
  car: CarModel;
}

const Car: React.FC<IProps> = ({ car, ...rest }) => {
  const netInfo = useNetInfo();

  const MotorIcon = getAccessoryIcon(car.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{car.brand}</Brand>
        <Name>{car.name}</Name>

        <About>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {netInfo.isConnected === true ? car.price : '...'}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage
        resizeMode="contain"
        source={{
          uri: car.thumbnail,
        }}
      />
    </Container>
  );
};

export { Car };
