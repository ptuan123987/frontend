import React, {useEffect, useState} from 'react';
import Slide from './Slides';
import CourseCard from '../cards/CourseCard';
import AuthService from "../../services/AuthService";
import CategoriesService from "../../services/CategoriesService";
import axios from "axios";
import Button1 from "../buttons/Button1";
import { Link } from 'react-router-dom';
import { API_URL } from '../../../Constants';

const CoursesSlide = ({categoryId}) => {
    const [courseData, setCourseData] = useState([]);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const fetchCourseInfo = async () => {
            try {
                const accessToken = AuthService.getCurrentAccessToken();
                const response = await axios.get(API_URL + `api/categories/${categoryId}/courses`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (response.status === 200) {
                    setCourseData(response.data.data); 
                    console.log('Fetched Course Info:', response.data);
                } else {
                    setError('Failed to fetch course information');
                }
            } catch (error) {
                setError('Error fetching course information');
            }
        };

        fetchCourseInfo();
    }, [categoryId]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categoryData = await CategoriesService.getCategoryById({ categoryId });
                setCategory(categoryData);
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };

        fetchCategory();
    }, [categoryId]);

    return (
        <div>
            <h2 className="text-3xl font-extrabold font-SuisseWorks mb-3">
                A broad selection of courses in {category?.name}
            </h2>
            <p className="text-xl font-light">
                Choose from over many online video courses
                with new additions published every month
            </p>
            <Slide>
                {courseData.slice(0, 10).map((course) => (
                    <CourseCard key={course.id} course={course}/> 
                ))}
            </Slide>
            <Link to={`/category/${categoryId}`}>
                <Button1>Explore Category {category?.name}</Button1>
            </Link>
        </div>
    );
};
export default CoursesSlide;
