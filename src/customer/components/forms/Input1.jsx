import React from 'react';

const FloatingLabelInput = ({ modelValue, label, ...attrs }) => {
  return (
    <div className="relative">
      <input
        className="block px-2.5 pb-2.5 pt-5 w-full text-sm text-black border border-black appearance-none focus:outline-none focus:border-black focus:ring-0 peer"
        placeholder=""
        value={modelValue}
        onChange={(e) => attrs['onChange'] && attrs['onChange'](e.target.value)}
        {...attrs}
      />

      <label
        className="absolute text-black font-black 
        font-UdemySansBold text-sm duration-300 
        transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {label}
      </label>
      {/* Add any children from the slot */}
      {attrs.children}
    </div>
  );
};

export default FloatingLabelInput;
