import React from 'react';
import Slide from './Slides';
import CourseCard from '../cards/CourseCard';

const CourseSlide = ({ courses }) => {
  return (
    <Slide>
      {Object.values(courses).map((row) => (
        <CourseCard key={row.id} course={row} />
      ))}
    </Slide>
  );
};

export default CourseSlide;
