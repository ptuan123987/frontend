import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CourseService from '../services/CourseService';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();

    useEffect(() => {
        // Reset search bar khi chuyển trang
        setSearchTerm('');
        setSearchResults([]);
    }, [location]);

    useEffect(() => {
        if (!searchTerm) {
            setSearchResults([]);
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            try {
                const results = await CourseService.searchCourseByName(searchTerm);
                setSearchResults(results);
            } catch (error) {
                console.error('Error searching courses:', error.message);
            }
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <div className="flex flex-col relative z-10">
            <input
                className="h-12 p-0 pl-8 pr-8 text-gray-900 border border-stone-900 bg-gray-100 rounded-full outline-none focus:outline-none"
                type="text"
                placeholder="Search for anything"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
                <div className="mt-1 p-0 pl-4 pr-4 border border-stone-200 bg-gray-50">
                    <ul className="divide-y divide-gray-300">
                        {searchResults.map((course) => (
                            <li key={course.id} className="py-2">
                                <Link
                                    to={`/course/${course.id}`}
                                    className="block hover:bg-gray-100 px-4 py-2 rounded-md"
                                >
                                    {course.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
