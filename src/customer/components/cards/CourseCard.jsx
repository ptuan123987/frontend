import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useWishlistStore from '../../stores/useWishlistStore';
import useUserStore from '../../stores/useUserStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckoutService } from '../../services/CheckoutService';
const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCourseInWishlist, setIsCourseInWishlist] = useState(false);
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlistStore(state => ({
    addToWishlist: state.addToWishlist,
    removeFromWishlist: state.removeFromWishlist,
    wishlist: state.wishlist
  }));
  const userId = useUserStore(state => state.userData?.id);

  useEffect(() => {
    setIsCourseInWishlist(wishlist.some(item => item.course && item.course.id === course.id));
  }, [wishlist]);


  const toggleWishlist = async () => {
    if (isCourseInWishlist) {
      await removeFromWishlist(course.id);
      successRemoved();
      setIsCourseInWishlist(false); 
    } else { 
      await addToWishlist(course);
      successAdded();
      setIsCourseInWishlist(true); 
    }
    setTimeout(() => {
      window.location.reload();
    }, 500)
  };

  const successAdded = () => toast.success("Added To Wishlist!");
  const successRemoved = () => toast.success("Removed To Wishlist!")

  const checkOut = async (course) => {
    try {
      const res = await CheckoutService.MomoCheckoutCourse(course.price, userId, course.id);
      const payUrl = res.data.payUrl;
      console.log(payUrl);
      window.location.href = payUrl;
    } catch (error) {
      console.error("Error occurred during checkout:", error);
    }
  }

  const wishlistButtonStyles = isCourseInWishlist
    ? "bg-purple-500 text-black hover:bg-blue-600"
    : "bg-transparent hover:bg-gray-100 text-gray-800";

  return (
    <div className="flex flex-col max-w-[15rem] relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Link to={`/course/${course.id}`} className="my-5">
        <img
          className="w-64 h-32 object-cover border border-stone-400 hover:transition-opacity hover:opacity-80"
          src={course.thumbnail_url}
          alt={course.title}
        />
        <div className="p-5">
          <h3 className="text-base line-clamp-2 text-ellipsis tracking-tight mb-0">
            {course.title}
          </h3>
          <p className="text-xs line-clamp-1 text-ellipsis text-gray-400">
            {course.author}
          </p>
          <p className="mb-3 font-UdemySansBold font-black">
            <span className="text-sm font-light align-text-top">đ</span>{' '}
            {course.price}{' '}
            <span className="line-through text-gray-400 text-sm font-normal ms-1">
            </span>
          </p>
        </div>
      </Link>

      {isHovered && (
        <div className="absolute top-0 left-full min-w-[8rem] bg-white p-4 pr-3 rounded-sm shadow-lg flex flex-col justify-between z-10">
          <div>
            <h3 className="text-lg font-bold mb-2">{course.title}</h3>
            <p className="text-sm mb-8">{course.description}</p>
          </div>
          <div className="flex justify-between items-center gap-4 ">
            <button
              className={`text-sm bg-transparent min-w-[8rem] hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow`}
              onClick={() => checkOut(course)}
            >
              Buy Now
            </button>
            <button
              className={`text-sm bg-transparent min-w-[10rem] hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ${wishlistButtonStyles}`}
              onClick={toggleWishlist}
            >
              {isCourseInWishlist ? 'Remove Wishlist' : 'Add Wishlist'}
              <span className="sm:hidden">❤️</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
