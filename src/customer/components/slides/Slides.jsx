import React from "react";
import SlideControls from "./SlideControls";
import { useSlideCourses } from "../../composables/SlideCourses";

const Slides = ({ dataSlideMotion, children, ...attrs }) => {
  useSlideCourses();

  return (
    <div className="relative" data-slide-motion={dataSlideMotion}>
      <div
        className="slides-container grid grid-flow-col auto-cols-max gap-4 overflow-x-hidden overflow-y-hidden snap-x scroll-smooth touch-manipulation"
        data-slide-container
        {...attrs}
      >
        {children}
        <SlideControls />
      </div>
    </div>
  );
};
// Slides.defaultProps = {
//   dataSlideMotion: 'slide',
// };
export default Slides;
