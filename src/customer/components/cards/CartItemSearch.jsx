import React from 'react';
import './cartItem.css';

const CartItemSearch = ({ course, isSelected, onToggleItem }) => {
  const handleSearchClick = () => {
    onToggleItem(course.id);
  };

  return (
    <div
      className={`cart-item-wrapper grid grid-cols-5 gap-4 items-center p-4 border-b ${
        isSelected ? 'bg-gray-100' : ''
      }`}
      onClick={handleSearchClick} 
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
       
      </div>
    </div>
  );
};

export default CartItemSearch;
