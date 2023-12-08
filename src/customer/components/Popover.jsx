import React from "react";

const Popover = ({ target, children }) => {
  return (
    <div
      data-popover
      id={target}
      className={`absolute top-[100%] right-0 z-50 translate-x-[50%] transition-transform  ${
        children ? "visible opacity-100 transform " : "invisible opacity-0"
      } inline-block transition-all duration-300 bg-white border border-gray-200 shadow-sm w-[300px] `}
      role="tooltip"
    >
      <div className="px-3 py-2">{children}</div>
    </div>
  );
};

export default Popover;
