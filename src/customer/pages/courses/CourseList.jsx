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
        <h1 className="text-3xl font-extrabold font-SuisseWorks mb-3">
          {category?.name} Courses
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <div>
        </div>
      </div>
    </Layout>
  );
};
export default CoursesPage;
