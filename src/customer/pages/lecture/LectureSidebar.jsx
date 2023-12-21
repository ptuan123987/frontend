import React, { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';

const ChapterList = ({ courseId, setChapterData }) => {
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

const Accordion = ({ title, content }) => {
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
                    <path
                        fillRule="evenodd"
                        d="M5.293 6.293a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414zM10 13a1 1 0 010-2h-.001a1 1 0 010 2z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-max-height ease-out duration-300 ${
                    accordionOpen ? 'h-auto' : 'h-0'
                }`}
            >
                <div className="border-t border-gray-300">
                    {content.map((lecture, index) => (
                        <div key={index} className="p-4">
                            <p>{lecture.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const LectureSideBar = ({ courseId }) => {
    const [chapterData, setChapterData] = useState([]);

    return (
        <div className="p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2 border-b-2 border-black">Course content</h2>
            <ChapterList courseId={courseId} setChapterData={setChapterData} />
            <div className="space-y-2 mt-4">
                {chapterData.map((chapter, index) => (
                    <Accordion key={index} title={chapter.title} content={chapter.lectures} />
                ))}
            </div>
        </div>
    );
};

export default LectureSideBar;
