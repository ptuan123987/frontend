import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import OverviewComponent from "./OverviewComponent";
import ReviewComponent from "./ReviewComponent";
import LectureSidebar from "./LectureSidebar";
import VideoPlayer from "./VideoPlayer";
import ResourceComponent from "./ResourceComponent";
const LectureNavBar = ({ handleButtonClick, activeButton }) => {
    const buttons = [
        { label: "Overview", id: "overview" },
        { label: "Reviews", id: "review" },
        { label: "Resources", id: "resource" },
    ];

    return (
        <nav className="bg-white border-gray-800 shadow-[0_2px_4px_rgba(0,0,0,0.08)] md:shadow-none">
            <div className="max-w-screen-xl flex items-center justify-start mx-auto p-1">
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        onClick={() => handleButtonClick(button.id)}
                        className={`text-gray-900 hover:text-purple-600 mr-4 focus:outline-none ${activeButton === button.id ? 'border-b-2 border-black' : ''} text-base font-bold`}
                    >
                        {button.label}
                    </button>
                ))}
            </div>
        </nav>
    );
};

const LecturePage = () =>  {
    const { courseId, chapterId, lectureId } = useParams();
    const [componentToShow, setComponentToShow] = useState(null);
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (component) => {
        setComponentToShow(component);
        setActiveButton(component);
    };

    return (
        <Layout>
            <div className="flex w-full">
           
                <div className="w-3/4">
                    
                    <div className="flex items-center justify-center">
                        <VideoPlayer lectureId={lectureId}/>
                    </div>
                    <div className="mx-12 py-4 border-b-2 border-black">
                        <LectureNavBar handleButtonClick={handleButtonClick} activeButton={activeButton} />
                        <div>
                            {componentToShow === "overview" && <OverviewComponent courseId={courseId} />}
                            {componentToShow === "review" && <ReviewComponent courseId={courseId} />}
                            {componentToShow === "resource" && <ResourceComponent lectureId={lectureId} />}
                        </div>
                    </div>
                </div>
                <div className="w-1/4 border-l-2">
                    <LectureSidebar className="flex-1 p-4 border-l-1 border-black" courseId={courseId}/>
                </div>
            </div>
        </Layout>
    );
};

export default LecturePage;
