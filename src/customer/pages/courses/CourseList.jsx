import React, { useState, useEffect } from 'react';
import CourseCard from '../../components/cards/CourseCard';
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import CourseService from '../../services/CourseService'; 
import CategoriesService from "../../services/CategoriesService";



const CoursesPage = () => {
  const { categoryId } = useParams();
  const [courses, setCourses] = useState([]);
  const popularTopics = ['Python', 'Data Science', 'React JS', 'Java', 'C#(programming language)', 'Web Development', 'Javascript', 'Unreal Engine', 'Machine Learning', 'Deep Learning'];
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await CourseService.getCoursesBySubCategoryId(categoryId);
        setCourses(response);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
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
    <Layout>
      <div className="container mx-auto p-6">
        {/* <CourseDescription courseId={courseId}/> */}

        {/* Tabs */}
        {/* <ul className="flex flex-wrap -mb-px pt-5">
          <li className="me-2">
            <a href="/mostpopular" className="inline-block p-4 text-black-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-black-500 dark:border-black-500 font-bold" aria-current="page">Most popular</a>
          </li>
          <li className="me-2">
            <a href="/new" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">New</a>
          </li>
          <li className="me-2">
            <a href="/trending" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Trending</a>
          </li>
        </ul>
        <hr /> */}

        <h1 className="text-3xl font-extrabold font-SuisseWorks mb-3">
          {category?.name} Courses
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <div>
          {/* <CoursesSlide categoryId={categoryId} /> */}
        </div>

        {/* -- FEATURE COURSE -- */}
        {/* <p className="text-xl font-bold text-gray-700">Featured courses</p> */}
        {/* -- POPULAR TOPIC -- */}
        {/* <div className='my-6'>
          <p className="text-xl font-bold text-gray-700">Popular topics</p>
          <div className="flex flex-wrap justify-start items-center gap-2">
            {popularTopics.map((topic, index) => (
              <button
                key={index}
                className="text-sm md:text-base bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full transition-colors duration-200"
              >
                {topic}
              </button>
            ))}
          </div>
        </div> */}


        {/* Include your CourseFilter component here if you have one */}

        {/* Pagination */}
      </div>
    </Layout>
  );
};
export default CoursesPage;
