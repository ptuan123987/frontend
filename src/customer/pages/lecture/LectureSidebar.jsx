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
        <div className="py-2 border-2">
            <button
                onClick={() => setAccordionOpen(!accordionOpen)}
                className="flex justify-between w-full"
            >
                <span>{title}</span>
                <svg
                    className="fill-indigo-500 shrink-0 ml-8"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center transition duration-200 ease-out ${
                            accordionOpen && "!rotate-180"
                        }`}
                    />
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                            accordionOpen && "!rotate-180"
                        }`}
                    />
                </svg>
            </button>
            <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
                    accordionOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden border-2">
                    {content.map((lecture, index) => (
                        <p key={index}>{lecture.title}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

const LectureSideBar = ({ courseId }) => {
    const [chapterData, setChapterData] = useState([]); // State để lưu data của chapter

    return (
        <div>
            <div className="font-bold font-SuisseWorks border-2">Course content</div>
            <ChapterList courseId={courseId} setChapterData={setChapterData} />
            {/* Sử dụng dữ liệu từ ChapterList thông qua prop */}
            {chapterData.map((chapter, index) => (
                <Accordion key={index} title={chapter.title} content={chapter.lectures} />
            ))}
        </div>
    );
};

export default LectureSideBar;
