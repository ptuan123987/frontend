import React from 'react';
import Slide from './Slides';
import CourseCard from '../cards/CourseCard';

const CoursesSlide = () => {
  const courseIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
      <Slide>
        {courseIds.map((courseId) => (
            <CourseCard key={courseId} courseId={courseId} />
        ))}
      </Slide>
  );
};

export default CoursesSlide;