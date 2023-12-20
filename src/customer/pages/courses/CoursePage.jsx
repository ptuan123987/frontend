import React, { useState } from 'react';
import CourseCard from '../../components/cards/CourseCard';
import Layout from "../../components/Layout";
import CoursesSlide from "../../components/slides/CoursesSlide";

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
    time_updated: 'July 2023',
    description: 'Learn javascript online and supercharge your web design with this Javascript for beginners training course.'
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
    time_updated: 'August 2023',
    description: 'Learn: HTML | CSS | JavaScript | Web programming | Web development | Front-end | Responsive | JQuery'
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
    time_updated: 'May 2023',
    description: 'The simplest way to learn C# programming.'
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
    time_updated: 'April 2016',
    description: 'Create Elegant, Powerful Web and Mobile Applications Using AJAX.'
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
    time_updated: 'August 2015',
    description: 'Learn how to create desktop and Internet GUI Java programs and take your Java programming to the next level.'
  },
  {
    id: 6,
    title: 'The Complete 2020 Fullstack Web Developer Course',
    instructor: { name: 'Kalob Taulien' },
    rating: 4.7,
    ratings_count: 7219,
    price: '279,000',
    inflated_price: '1,499,000',
    image: 'assets/images/course-page/development-course/image6.png',
    link: '/course-link',
    time_updated: 'August 2020',
    description: 'Learn HTML5, CSS3, JavaScript, Python, Wagtail CMS, PHP & MySQL from scratch!'
  },
  {
    id: 7,
    title: 'Java Swing (GUI) Programming: From Beginner to Expert',
    instructor: { name: 'John Purcell' },
    rating: 4.6,
    ratings_count: 2681,
    price: '329,000',
    inflated_price: '1,699,000',
    image: 'assets/images/course-page/development-course/image7.png',
    link: '/course-link',
    time_updated: 'May 2023',
    description: 'The simplest way to learn C# programming.'
  },
  {
    id: 8,
    title: 'Java Swing (GUI) Programming: From Beginner to Expert',
    instructor: { name: 'John Purcell' },
    rating: 4.6,
    ratings_count: 2681,
    price: '329,000',
    inflated_price: '1,699,000',
    image: 'assets/images/course-page/development-course/image8.png',
    link: '/course-link',
    time_updated: 'May 2023',
    description: 'The simplest way to learn C# programming.'
  },
  {
    id: 9,
    title: 'Java Swing (GUI) Programming: From Beginner to Expert',
    instructor: { name: 'John Purcell' },
    rating: 4.6,
    ratings_count: 2681,
    price: '329,000',
    inflated_price: '1,699,000',
    image: 'assets/images/course-page/development-course/image9.png',
    link: '/course-link',
    time_updated: 'May 2023',
    description: 'The simplest way to learn C# programming.'
  },
  {
    id: 10,
    title: 'Java Swing (GUI) Programming: From Beginner to Expert',
    instructor: { name: 'John Purcell' },
    rating: 4.6,
    ratings_count: 2681,
    price: '329,000',
    inflated_price: '1,699,000',
    image: 'assets/images/course-page/development-course/image10.png',
    link: '/course-link',
    time_updated: 'May 2023',
    description: 'The simplest way to learn C# programming.'
  },
  // ...other courses
];

const tabs = ['Most popular', 'New', 'Trending'];

const instructorsData = [
  {
    id: 1,
    name: 'Dr. Angela Yu',
    subject: 'Python, Data Science',
    rating: 4.7,
    studentsCount: '2,447,808',
    coursesCount: 7,
    imageUrl: '/path-to-image-of-Dr-Angela-Yu',
  }
]

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
        <h1 className="text-3xl font-bold my-4 font-serif">Development Courses</h1>
        <p className='text-xl font-bold text-gray-700'>Courses to get you started</p>

        {/* Tabs */}
        <ul className="flex flex-wrap -mb-px pt-5">
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
        <hr />

        {/* <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {coursesData.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div> */}
        <div>
          <CoursesSlide courses={coursesData} />
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
