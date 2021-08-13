import React from 'react';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styles';

interface IProps {
  imagesUrl: string[];
}

const ImageSlider: React.FC<IProps> = ({ imagesUrl }) => {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>

      <CarImageWrapper>
        <CarImage source={{ uri: imagesUrl[0] }} resizeMode="contain" />
      </CarImageWrapper>
    </Container>
  );
};

export { ImageSlider };
