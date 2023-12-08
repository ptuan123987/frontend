import React from 'react';

const Button2 = ({ children }) => {
  return (
    <button
      type="button"
      className="bg-black hover:bg-black text-white  
      mb-5 font-bold focus:outline-none focus:ring-4
       focus:ring-gray-200 text-sm px-5 py-2.5 mr-2"
    >
      {children}
    </button>
  );
};

export default Button2;