import React, { useRef, useState } from 'react';
import { ViewToken } from 'react-native';
import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
  CarPhotos,
} from './styles';

interface Props {
  imagesUrl: string[];
}
interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

const ImageSlider: React.FC<Props> = ({ imagesUrl }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChange = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });
  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((image, index) => (
          <ImageIndex key={String(image)} active={index === imageIndex} />
        ))}
      </ImageIndexes>

      <CarPhotos
        data={imagesUrl}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChange.current}
      />
    </Container>
  );
};

export default ImageSlider;
