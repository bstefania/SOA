import React from 'react';
import { Carousel } from 'react-bootstrap'
import recipe2img from '../public/images/recipe2.jpg'
import recipe3img from '../public/images/recipe3.jpg'
import recipe4img from '../public/images/recipe4.jpg'


const Home = () => (
  <div id="home">
    <div className='p-2 text-center bg-light home-header'>
        <h1 className='mb-3'>Welcome to your food world!</h1>
    </div>
    <Carousel className="home-carousel">
  <Carousel.Item interval={2000}>
    <img
      className="d-block w-100 recipe-images"
      src={recipe2img}
      alt="First slide"
    />
    <Carousel.Caption className="caption-fade">
      <h3>Let's make our life magical</h3>
      <p>A comunity with the best recipes.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={2000}>
    <img
      className="d-block w-100 recipe-images"
      src={recipe3img}
      alt="Second slide"
    />
    <Carousel.Caption className="caption-fade">
      <h3>Everything you need is here</h3>
      <p>Anything you can think of.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item  interval={2000}>
    <img
      className="d-block w-100 recipe-images"
      src={recipe4img}
      alt="Third slide"
    />
    <Carousel.Caption className="caption-fade">
      <h3>A place to keep your own recipes</h3>
      <p>And share with others too.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
  </div>
);

export default Home;
