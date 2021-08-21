import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { ICar } from '../../dtos/ICarDTO';

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
  car: ICar;
}

const Car: React.FC<IProps> = ({ car, ...rest }) => {
  const MotorIcon = getAccessoryIcon(car.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{car.brand}</Brand>
        <Name>{car.name}</Name>

        <About>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{`R$ ${car.rent.price}`}</Price>
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
