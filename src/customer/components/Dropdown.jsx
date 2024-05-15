import React from "react";

const Dropdown = ({ children,selected }) => {
  return (
    <div
      className="z-50 hidden bg-white divide-y divide-gray-100 
    shadow w-full dark:bg-gray-700"
    >
      {children}
    </div>
  );
};

export default Dropdown;
