import React, { useState, useRef } from 'react';
import { ViewToken } from 'react-native';

import { Bullet } from '../Bullet';

import {
  Container,
  ImageIndexes,
  CarImageWrapper,
  CarImagesList,
  CarImage,
} from './styles';

interface IProps {
  imagesUrl: string[];
}

interface IChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

const ImageSlider: React.FC<IProps> = ({ imagesUrl }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: IChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((_, index) => (
          <Bullet key={String(index)} active={index === imageIndex} />
        ))}
      </ImageIndexes>

      <CarImagesList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={imagesUrl}
        keyExtractor={key => key}
        renderItem={({ item: image }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: image }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
};

export { ImageSlider };
