import React from "react";
import "./modal.css";

const Modal = ({ setOpenModal, children, onClick }) => {
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
            <div className="modalContent text-center">
                {children}
            </div>
            <div className="footer">
            <button
                onClick={() => {
                setOpenModal(false);
                if (onClick) onClick();
                }}
                id="cancelBtn"
            >
                Cancel
            </button>
            <button onClick={onClick}>Continue</button>
            </div>
        </div>
        </div>
    </div>
  );
}

export default Modal;
