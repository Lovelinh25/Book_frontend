import React from "react";
import { Carousel } from "react-bootstrap";
import CarouselImage from "../../components/CarouselImage";

const HomePage = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <CarouselImage image="img.jpg" />
        <Carousel.Caption style={{ color: "black" }}>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage image="img.jpg" />
        <Carousel.Caption style={{ color: "black" }}>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage image="img.jpg" />
        <Carousel.Caption style={{ color: "black" }}>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomePage;
