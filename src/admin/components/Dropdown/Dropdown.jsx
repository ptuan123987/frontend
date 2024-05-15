import React from 'react';

const Dropdown = ({ children }) => {
    return (
        <div className="absolute top-15 left-0 z-50 w-40 bg-white border border-gray-200 rounded shadow">
            {children}
        </div>
    );
};

export default Dropdown;
