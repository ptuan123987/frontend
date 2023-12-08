import React, { useEffect } from 'react';
import SlideControls from './SlideControls';
import { useSlide } from '../../composables/Slide';

const SlideContainer = ({ dataSlideMotion, children, ...attrs }) => {
  useSlide();
 

  return (
    <div className="relative" data-slide-motion={dataSlideMotion}>
      <div
        className="slides-container grid grid-flow-col auto-cols-max gap-4 overflow-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] snap-x snap-mandatory scroll-smooth touch-manipulation"
        data-slide-container
        {...attrs}
      >
        {children}
        {/* Slider controls */}
        {children && (
          <div className="slide-controls">
            {React.Children.map(children, (child) => {
              if (child?.type === SlideControls) {
                return child;
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SlideContainer;
