import React from 'react';
import './modal.css';

const SuccessModal = ({ setOpenModal, children }) => {
  return (
    <div
      className="modalOverlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
      onClick={() => setOpenModal(false)}
    >
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => setOpenModal(false)}
            >
              X
            </button>
          </div>
          <div className="modalContent">
            {children}
          </div>
          <div className="footer">
            <button onClick={() => setOpenModal(false)}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
