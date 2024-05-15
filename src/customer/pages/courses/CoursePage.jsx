import React, { useState } from 'react';
import Layout from "../../components/Layout";
import CoursesSlide from "../../components/slides/CoursesSlide";
import { useParams } from "react-router-dom";
import CourseDescription from "./CourseDescription";

const CoursesPage = () => {
  const { courseId } = useParams();
    const randomCategoryId = Math.floor(Math.random() * 22) + 1;

    return (
    <Layout>
      <div className="container mx-auto p-6">
        <CourseDescription courseId={courseId}/>
      </div>
    </Layout>
  );
};
export default CoursesPage;
