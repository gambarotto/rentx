import { Dimensions, FlatList, FlatListProps } from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { PhotoCarApi } from '../../dtos/CarDTO';

export const Container = styled.View``;
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
export const CarPhotos = styled(
  FlatList as new (
    // eslint-disable-next-line no-unused-vars
    props: FlatListProps<PhotoCarApi>,
  ) => FlatList<PhotoCarApi>,
).attrs({
  contentContainerStyle: {},
  showsVerticalScrollIndicator: false,
})``;
export const CarImage = styled(FastImage)`
  width: 280px;
  height: 132px;
`;
