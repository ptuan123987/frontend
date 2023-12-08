import React from 'react';
import { Link } from 'react-router-dom'; 
import StarRating from '../star_rating/StarRating';


const CourseCard = ({ course }) => {
  return (
    <div className="flex flex-col max-w-[15rem]">
      <Link to={course.link} className="my-5">
        <img
          className="w-full h-32 object-cover border border-stone-400 hover:transition-opacity hover:opacity-80"
          src={course.image}
          alt=""
        />
        <div className="p-5">
          <h3 className="text-base line-clamp-2 text-ellipsis tracking-tight mb-0">
            {course.title}
          </h3>
          <p className="text-xs line-clamp-1 text-ellipsis text-gray-400">
          {course.instructor && course.instructor.name ? course.instructor.name : 'Unknown Instructor'}
          </p>
          <div className="flex items-center">
            <StarRating rating={course.rating} />
            <span className="text-gray-400 text-xs">({course.ratings_count}) </span>
          </div>
          <p className="mb-3 font-UdemySansBold font-black">
            ₦{course.price}{' '}
            <span className="line-through text-gray-400 text-sm font-normal ms-1">
              ₦{course.inflated_price}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
