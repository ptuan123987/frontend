import React, { useEffect } from 'react';
import CarouselControls from './CarouselControls';
import { useSlide } from '../../composables/Slide';

const Carousel = ({ dataSlideMotion, children, ...props }) => {
  useSlide();

  useEffect(() => {
    // Additional logic or side effects can be added here
  }, []);

  return (
    <div className={`relative`} data-slide-motion={dataSlideMotion}>
      <div
        className={`slides-container grid grid-flow-col auto-cols-[100%] gap-0 overflow-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth touch-manipulation`}
        data-slide-container
        {...props}
        style={{ overflowX: 'hidden' }} 
      >
        {children}
        <CarouselControls />
      </div>
    </div>
  );
};

Carousel.defaultProps = {
  dataSlideMotion: 'slide',
};

export default Carousel;
