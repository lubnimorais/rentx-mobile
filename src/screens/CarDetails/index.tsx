import React from 'react';
import { Text } from 'react-native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { Container, Header, CarImages } from './styles';

const CarDetails: React.FC = () => {
  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={[
            'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
            'https://www.pngkit.com/png/full/237-2375888_porsche-panamera-s.png',
          ]}
        />
      </CarImages>
    </Container>
  );
};

export { CarDetails };
