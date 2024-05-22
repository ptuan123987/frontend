import React from 'react';
import Button1 from '../buttons/Button1';
import "./modal.css";

const SuccessModal = ({ setOpenModal, children, onClick }) => {
  return (
    <div className="modalOverlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50" onClick={() => {
        setOpenModal(false);
        if (onClick) onClick();
      }}>

        <div className="modalBackground">
        <div className="modalContainer">
            <div className="titleCloseBtn">
            <button
                onClick={() => {
                setOpenModal(false);
                if (onClick) onClick();
                }}
            >
                X
            </button>
            </div>
            <div className="modalContent">
            {children}
            </div>
            <div className="footer">
            <button onClick={onClick}>Close</button>
            </div>
        </div>
        </div>
    </div>
  );
}

export default SuccessModal;
