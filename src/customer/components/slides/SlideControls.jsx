import React from 'react';

const SlideControls = ({ previousControlCustom, nextControlCustom }) => {
  return (
    <div className="hidden md:block">
      <button
        type="button"
        className={`absolute top-0 -left-6 z-20 flex items-center justify-center h-full cursor-pointer group focus:outline-none ${previousControlCustom}`}
        data-slide-previous
      >
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black">
          <svg
            aria-hidden="true"
            className="w-6 h-6 text-white font-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className={`absolute top-0 -right-6 z-20 flex items-center justify-center h-full cursor-pointer group focus:outline-none ${nextControlCustom}`}
        data-slide-next
      >
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black">
          <svg
            aria-hidden="true"
            className="w-6 h-6 text-white "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default SlideControls;
