import React from 'react';
import Button1 from '../buttons/Button1';

const SuccessModal = ({ children, onClick }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={onClick}></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[400px] max-w-md">
        <div className="bg-white p-8 rounded-md shadow-md">
          <button className="absolute top-0 right-0 mt-2 mr-2 text-xl cursor-pointer" onClick={onClick}>
            &times;
          </button>
          <div className="modal-content m-5">
            {children} 
          </div>
          <div className="mt-4 flex justify-end">
            <Button1 onClick={onClick}>Close</Button1>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default SuccessModal;
