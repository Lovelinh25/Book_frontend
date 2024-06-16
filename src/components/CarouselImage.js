import React from 'react';
import { Image } from 'react-bootstrap';

const CarouselImage = ({ image }) => {
  const getImageSource = () => {
    return image.toLowerCase();
  };

  return <Image src={getImageSource()} fluid thumbnail width='100%' />;
};

export default CarouselImage;
