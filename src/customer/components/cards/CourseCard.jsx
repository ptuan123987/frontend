import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../star_rating/StarRating';
import useWishlistStore from '../../stores/useWishlistStore';


const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlistStore(state => ({
    addToWishlist: state.addToWishlist,
    removeFromWishlist: state.removeFromWishlist,
    wishlist: state.wishlist
  }));
  const isCourseInWishlist = wishlist.some(item => item.id === course.id);

  const toggleWishlist = async () => {
    if (isCourseInWishlist) {
      await removeFromWishlist(course.id);
    } else {
      await addToWishlist(course);
    }
  };

  const wishlistButtonStyles = isCourseInWishlist
    ? "bg-purple-500 text-black hover:bg-blue-600"
    : "bg-transparent hover:bg-gray-100 text-gray-800";

  return (
    <div className="flex flex-col max-w-[15rem] relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Link to={course.link} className="my-5">
        <img
          className="w-full h-32 object-cover border border-stone-400 hover:transition-opacity hover:opacity-80"
          src={course.image}
          alt={course.title}
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
            ${course.price}{' '}
            <span className="line-through text-gray-400 text-sm font-normal ms-1">
              ${course.inflated_price}
            </span>
          </p>
        </div>
      </Link>
      {/* Hover Details */}
      {isHovered && (
        <div className="absolute top-0 left-full min-w-[20rem] bg-white p-4 pr-3 rounded-sm shadow-lg flex flex-col justify-between z-10">
        <div>
          <h3 className="text-lg font-bold mb-2">{course.title}</h3>
          <p className="text-sm mb-2">Updated {course.time_updated}</p>
          <p className="text-sm mb-8">{course.description}</p>
        </div>
        <div className="flex justify-between items-center">
          <button
            className={`text-sm bg-transparent min-w-[20rem] hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ${wishlistButtonStyles}`}
            onClick={toggleWishlist}
          >
            {isCourseInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            {/* <span className="hidden sm:inline">Add to Wishlist</span>
            <span className="sm:hidden">❤️</span> */}
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default CourseCard;
