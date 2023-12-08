import React from 'react';

const Card1 = ({ children }) => {
  return (
    <div className="w-full p-6 bg-white border border-stone-400">
      {children}
    </div>
  );
};

export default Card1;
