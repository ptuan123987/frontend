import React from 'react';

const Button1 = ({ children }) => {
  return (
    <button
      type="button"
      className="border border-black 
      mb-5 text-gray-900 font-bold focus:outline-none 
      hover:bg-gray-100 focus:ring-4
       focus:ring-gray-200 text-sm px-5 py-2.5 mr-2"
    >
      {children}
    </button>
  );
};

export default Button1;