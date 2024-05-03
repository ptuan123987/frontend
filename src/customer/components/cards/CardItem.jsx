import React, { useState } from 'react';

const CardItem = ({ course, selectedArray, removeFromCart }) => {
    const [isHover, setIsHover] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const handleClick = () => {
        setIsSelected(!isSelected);
    };

    return (
        <div className="flex justify-start my-2">
            <div className="my-auto">
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="flex items-center justify-start p-0.5 cursor-pointer"
                >
                    <div
                        onClick={handleClick}
                        className={`flex items-center justify-center h-[20px] w-[20px] rounded-full border mr-5 ml-2 ${
                            isHover ? 'border-[#FD374F]' : 'border-gray-300'
                        } ${isSelected ? 'bg-[#FD374F]' : ''}`}
                    >
                        <div className="h-[8px] w-[8px] rounded-full bg-white" />
                    </div>
                </div>
            </div>
            <img src={course.thumbnail_url} alt="" className="rounded-md md:w-[150px] w-[90px]" />

            <div className="overflow-hidden pl-2 w-full">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center justify-between truncate">
                        <span className="sm:block hidden bg-[#FD374F] text-white text-[9px] font-semibold px-1.5 rounded-sm min-w-[80px]">
                            Welcome Deal
                        </span>
                        <div className="truncate" style={{ paddingLeft: '2px' }}>
                            {course.title}
                        </div>
                    </div>
                    <button onClick={removeFromCart} className="mx-3 sm:block hidden -mt-0.5 hover:text-red-500">
                        {/* <Icon name="material-symbols:delete-outline" size="20" /> */}
                    </button>
                </div>

                <div className="text-xl font-semibold">${' '}<span className="font-bold">{course.price / 100}</span></div>
                <div className="flex items-center justify-end">
                    <button onClick={removeFromCart} className="block sm:hidden -mt-0.5 hover:text-red-500">
                        {/* <Icon name="material-symbols:delete-outline" size="20" /> */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardItem;
