import React from 'react';

import GasolineSvg from '../../assets/gasoline.svg';

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

interface IRent {
  period: string;
  price: number;
}

interface IProps {
  brand: string;
  name: string;
  rent: IRent;
  thumbnail: string;
}

const Car: React.FC<IProps> = ({ brand, name, rent, thumbnail }) => {
  return (
    <Container>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>

        <About>
          <Rent>
            <Period>{rent.period}</Period>
            <Price>{`R$ ${rent.price}`}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CarImage
        resizeMode="contain"
        source={{
          uri: thumbnail,
        }}
      />
    </Container>
  );
};

export { Car };
