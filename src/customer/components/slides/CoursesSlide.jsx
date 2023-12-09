import React from 'react';
import Slide from './Slides';
import CourseCard from '../cards/CourseCard';

const CoursesSlide = ({ courses }) => {
  return (
    <Slide>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </Slide>
  );
};

export default CoursesSlide;