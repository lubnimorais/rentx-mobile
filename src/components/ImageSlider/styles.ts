import styled from 'styled-components/native';
import { Dimensions, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';

interface IImage {
  id: string;
  photo: string;
}

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;

export const CarImageWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 132px;

  justify-content: center;
  align-items: center;
`;

export const CarImagesList = styled(FlatList as new () => FlatList<IImage>)``;

export const CarImage = styled(FastImage)`
  width: 280px;
  height: 132px;
`;
