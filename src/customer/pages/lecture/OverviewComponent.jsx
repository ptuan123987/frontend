import React, { useState, useEffect } from 'react';
import AuthService from "../../services/AuthService";

const OverviewComponent = ({ courseId }) => {
    const [courseInfo, setCourseInfo] = useState(null);

    useEffect(() => {
        const fetchCourseInfo = async () => {
            try {
                const accessToken = AuthService.getCurrentAccessToken();
                const response = await fetch(`https://api-study.salyr.online/api/courses/${courseId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setCourseInfo(data);
                    console.log('Fetched Lecture Info:', data);
                } else {
                    console.error('Failed to fetch lecture information');
                }
            } catch (error) {
                console.error('Error fetching lecture information:', error);
            }
        };

        fetchCourseInfo();
    }, [courseId]);

    return (
        <div>
            {courseInfo ? (
                <div>
                    <h1 className="font-bold font-SuisseWorks text-2xl">{courseInfo.data.title}</h1>
                    <div className="border-2 p-2">
                        <h2 className="font-bold font-black font-SuisseWorks text-1xl">Description</h2>
                        <p className="font-SuisseWorks">{courseInfo.data.description}</p>
                    </div>
                    <p className="font-SuisseWorks">Price: ${courseInfo.data.price}</p>
                    <p className="font-SuisseWorks">Author: {courseInfo.data.author}</p>
                    {/*<p className="font-SuisseWorks">Total Video Duration: {courseInfo.data.total_video_duration} hours</p>*/}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default OverviewComponent;
