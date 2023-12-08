import React from 'react';

const Button3 = ({ children }) => {
  return (
    <button
      type="button"
      className="bg-[#a435f0] text-white w-full h-12 font-UdemySansBold mb-2"
    >
      {children}
    </button>
  );
};

export default Button3;