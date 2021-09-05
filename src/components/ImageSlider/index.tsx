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

interface IImage {
  id: string;
  photo: string;
}

interface IProps {
  imagesUrl: Array<IImage>;
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
        {imagesUrl.map((item, index) => (
          <Bullet key={String(item.id)} active={index === imageIndex} />
        ))}
      </ImageIndexes>

      <CarImagesList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={imagesUrl}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item.photo }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
};

export { ImageSlider };
