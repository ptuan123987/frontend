import React, { useEffect, useState } from 'react';
import Slide from './Slides';
import CourseCard from '../cards/CourseCard';
import AuthService from "../../services/AuthService";
import axios from "axios";

const CoursesSlide = ( {categoryId} ) => {
    const [courseData, setCourseData] = useState([]); // State để lưu trữ dữ liệu khóa học từ backend
    const [error, setError] = useState(null);
    // const categoryId = 1;

    useEffect(() => {
        const fetchCategoryInfo = async () => {
            try {
                const accessToken = AuthService.getCurrentAccessToken();
                const response = await axios.get(`https://api-study.salyr.online/api/categories/${categoryId}/courses`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (response.status === 200) {
                    setCourseData(response.data.data); // Lưu dữ liệu khóa học vào state
                    console.log('Fetched Category Info:', response.data);
                } else {
                    setError('Failed to fetch category information');
                }
            } catch (error) {
                setError('Error fetching category information');
            }
        };

        fetchCategoryInfo();
    }, [categoryId]);

    return (
        <Slide>
            {courseData.slice(0, 10).map((course) => (
                <CourseCard key={course.id} course={course} /> // Truyền dữ liệu khóa học vào CourseCard qua props
            ))}
        </Slide>
    );
};

export default CoursesSlide;
