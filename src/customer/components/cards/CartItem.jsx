import React from 'react';
import './cartItem.css';
import WishListService from '../../services/WishListService';
const CartItem = ({ course, isSelected, onToggleItem }) => {
  const handleCartItemClick = () => {
    onToggleItem(course.id);
  };
  const  removeWishlistCourse = (id) => {
    WishListService.removeCourseToWishlist(id);
  }

  return (
    <div
      className={`cart-item-wrapper grid grid-cols-5 gap-4 items-center p-4 border-b ${
        isSelected ? 'bg-gray-100' : ''
      }`}
      onClick={handleCartItemClick} 
    >
      <div className='cart-item-img col-span-1 flex justify-center items-center'>
        <img src={course.thumbnail_url} alt={course.title} className='w-full h-auto' />
      </div>
      <div className='cart-item-info col-span-2 flex flex-col justify-center'>
        <p className='font-bold text-lg'>{course.title}</p>
        <span className='text-sm text-gray-500'>By {course.author}</span>
        <p className='mt-2 mb-3 text-xl font-semibold'>
          <span className='align-top text-sm font-light'>đ</span>
          {course.price}
        </p>
      </div>
      <div className='col-span-5 flex justify-between items-start'>
        <label className='checkbox-container absolute top-0 right-0'>
          <input type='checkbox' checked={isSelected} onChange={() => {}} />
          <span className='checkmark'></span>
        </label>
        <button
          type='button'
          className='remove-btn text-sm text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2'
          onClick={() => removeWishlistCourse(course.id)}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
            <path
              fillRule='evenodd'
              d='M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z'
            />
          </svg>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
