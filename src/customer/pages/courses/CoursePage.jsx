import React, { useState } from 'react';
import Layout from "../../components/Layout";
import CoursesSlide from "../../components/slides/CoursesSlide";
import { useParams } from "react-router-dom";
import CourseDescription from "./CourseDescription";

const CoursesPage = () => {
  const { courseId } = useParams();

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <CourseDescription courseId={courseId}/>

        <div className="mt-16">
          <CoursesSlide categoryId={courseId} />
        </div>
      </div>
    </Layout>
  );
};
export default CoursesPage;
