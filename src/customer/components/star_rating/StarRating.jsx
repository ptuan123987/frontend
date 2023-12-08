import React from 'react';
import './star.css'
const StarRating = ({ rating }) => {
  const starStyle = {
    '--star-rating': rating,
  };

  return (
    <div className="flex items-center me-2">
      <span className="text-sm font-bold text-yellow-600 me-2">{rating}</span>
      <div className="stars" style={starStyle}></div>
    </div>
  );
};

export default StarRating;
