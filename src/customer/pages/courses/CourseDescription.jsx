import React, {useEffect, useState} from 'react';
import AuthService from "../../services/AuthService";
import {Link} from 'react-router-dom';

const ChapterList = ({courseId, setChapterData}) => {
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const accessToken = AuthService.getCurrentAccessToken();
                const response = await fetch(`https://api-study.salyr.online/api/courses/${courseId}/chapters`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data && data.data) {
                        setChapters(data.data);
                        setChapterData(data.data); // Lưu data của chapter xuống
                        console.log('Fetched chapters:', data.data);
                    }
                } else {
                    console.error('Failed to fetch chapters');
                }
            } catch (error) {
                console.error('Error fetching chapters:', error);
            }
        };

        fetchChapters();
    }, [courseId, setChapterData]);

    return null; // Không render gì ra ngoài, vì chỉ cần lưu dữ liệu xuống
};

const Accordion = ({title, content, onClickLecture}) => {
    const [accordionOpen, setAccordionOpen] = useState(false);

    return (
        <div className="border border-gray-300 rounded-md my-2">
            <button
                onClick={() => setAccordionOpen(!accordionOpen)}
                className="flex justify-between w-full p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none"
            >
                <span>{title}</span>
                <svg
                    className={`fill-current h-4 w-4 transition-transform ${
                        accordionOpen ? 'rotate-90' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    {/* ... */}
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-max-height ease-out duration-300 ${
                    accordionOpen ? 'h-auto' : 'h-0'
                }`}
            >
                <div className="border-t border-gray-300">
                    {content.map((lecture, index) => (
                        <div key={index} className={`${index !== 0 ? 'border-t border-gray-300' : ''} p-4`}>
                            <button
                                onClick={() => onClickLecture(lecture.chapter_id, lecture.id)}>{lecture.title}</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CourseDescription = ({courseId}) => {
    const [courseInfo, setCourseInfo] = useState(null);
    const [chapterData, setChapterData] = useState([]);

    const handleLectureClick = (chapterId, lectureId) => {
        const lectureUrl = `/course/${courseId}/chapter/${chapterId}/lecture/${lectureId}`;
        window.location.href = lectureUrl; // Điều hướng tới lecture
    };

    const handleStartButtonClick = () => {
        if (chapterData.length > 0 && chapterData[0].lectures.length > 0) {
            const firstChapter = chapterData[0];
            const firstLecture = firstChapter.lectures[0];
            const lectureUrl = `/course/${courseId}/chapter/${firstChapter.id}/lecture/${firstLecture.id}`;
            window.location.href = lectureUrl;
        }
    };

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
        <div className="space-y-8 flex flex-col">
            <div>
                {courseInfo ? (
                    <div className="bg-black text-white p-4 rounded-md shadow-md">
                        <h1 className="text-3xl font-bold my-4 font-serif text-white">{courseInfo.data.title}</h1>
                        <p className="text-xl font-bold text-white">{courseInfo.data.description}</p>
                        <div className="flex justify-between items-end mt-4 border-t-2">
                            <div className="text-gray-200 font-semibold">
                                <p>Price: ${courseInfo.data.price}</p>
                                <p>Author: {courseInfo.data.author}</p>
                                <p>Total Video Duration: {courseInfo.data.total_video_duration} hours</p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleStartButtonClick}
                                >
                                    Start Now
                                </button>
                                <button className="bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Add to wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="p-4 rounded-md border-2">
                <h2 className="text-xl font-bold mb-2 border-b-2 border-black">Course content</h2>
                <ChapterList courseId={courseId} setChapterData={setChapterData}/>
                <div className="space-y-2 mt-4">
                    {chapterData.map((chapter, index) => (
                        <Accordion key={index} title={chapter.title} content={chapter.lectures}
                                   onClickLecture={(chapterId, lectureId) => handleLectureClick(chapterId, lectureId)}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseDescription;