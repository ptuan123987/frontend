import React, { useState } from 'react';
import CourseCard from '../../components/cards/CourseCard'; // Your CourseCard component
import Layout from "../../components/Layout";
// import CourseFilter from '../../components/cards/CourseFilter'; // Your CourseFilter component, if you have one
import Slider from "react-slick"

// const sliderSettings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 4,
//   slidesToScroll: 4,
//   arrows: false,
// }
const coursesData = [
  {
    id: 1,
    title: 'Javascript for Beginners',
    instructor: { name: 'Framework Tech' },
    rating: 4.6,
    ratings_count: 2607,
    price: '279,000',
    inflated_price: '1,099,000',
    image: 'assets/images/course-page/development-course/image1.png',
    link: '/course-link',
  },
  {
    id: 2,
    title: 'Become a Certified Web Developer: HTML, CSS and JavaScript',
    instructor: { name: 'Framework Tech, Mark Lassoff' },
    rating: 4.5,
    ratings_count: 3545,
    price: '279,000',
    inflated_price: '1,399,000',
    image: 'assets/images/course-page/development-course/image2.png',
    link: '/course-link',
  },
  {
    id: 3,
    title: 'Learn C# Programming (In Ten Easy Steps)',
    instructor: { name: 'Huw Collingbourne' },
    rating: 4.5,
    ratings_count: 1631,
    price: '329,000',
    inflated_price: '1,399,000',
    image: 'assets/images/course-page/development-course/image3.png',
    link: '/course-link',
  },
  {
    id: 4,
    title: 'AJAX Development',
    instructor: { name: 'Framework Tech, Mark Lassoff' },
    rating: 4.6,
    ratings_count: 986,
    price: '279,000',
    inflated_price: '829,000',
    image: 'assets/images/course-page/development-course/image4.png',
    link: '/course-link',
  },
  {
    id: 5,
    title: 'Java Swing (GUI) Programming: From Beginner to Expert',
    instructor: { name: 'John Purcell' },
    rating: 4.6,
    ratings_count: 2681,
    price: '329,000',
    inflated_price: '1,699,000',
    image: 'assets/images/course-page/development-course/image5.png',
    link: '/course-link',
  },
  // ...other courses
];

const tabs = ['Most popular', 'New', 'Trending'];

const JavaScriptCoursesPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const filteredCourses = coursesData.filter(course => {
    // filtering logic
    return course;
  });
  const popularTopics = ['Python', 'Data Science', 'React JS', 'Java', 'C#(programming language)', 'Web Development', 'Javascript', 'Unreal Engine', 'Machine Learning', 'Deep Learning'];

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold my-4 ">Development Courses</h1>
        <p className='text-xl font-bold text-gray-700'>Courses to get you started</p>

        {/* Tabs */}
        <div className="flex flex-wrap my-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`m-2 p-2 ${activeTab === tab ? 'bg-gray-300' : 'bg-gray-200'} rounded hover:bg-gray-300`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Carousel with CourseCards */}
        {/* <Slider {...sliderSettings}>
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </Slider> */}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {coursesData.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* -- FEATURE COURSE -- */}
        <p className="text-xl font-bold text-gray-700">Featured courses</p>

        {/* -- POPULAR TOPIC -- */}
        <div className='my-6'>
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
        </div>
        {/* Include your CourseFilter component here if you have one */}

        {/* Pagination */}
      </div>
    </Layout>
  );
};
export default JavaScriptCoursesPage;
