// import React from "react";
// import Layout from "../components/Layout";
// import Carousel from "../components/carousels/Carousels";
// import CourseCard from "../components/cards/CourseCard"; // Assuming CourseCard is a component that displays a course
// import { useNavigate } from "react-router-dom";

// const coursesData = [
//   // Add your courses data here
//   // Example course data format
//   {
//     id: 1,
//     title: "The Complete Python Bootcamp",
//     author: "Jose Portilla",
//     price: "329,000",
//     originalPrice: "1,999,000",
//     rating: 4.6,
//     imageSrc: "/path/to/image.jpg",
//     bestSeller: true
//   },
//   // ...more courses
// ];

// const Course = () => {
//   const navigate = useNavigate();
//   const appName = "Udemy";
  
//   const handleCourseClick = (courseId) => {
//     // Handle navigation to course details page
//     navigate(`/course/${courseId}`);
//   };

//   return (
//     <Layout>
//       {/* ...other components... */}

//       <section className="p-5 mb-5">
//         <h2 className="text-3xl font-extrabold mb-3">Python Courses</h2>
//         <p className="text-xl font-light">
//           Choose from popular Python courses tailored to your needs.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
//           {coursesData.map((course) => (
//             <CourseCard
//               key={course.id}
//               title={course.title}
//               author={course.author}
//               price={course.price}
//               originalPrice={course.originalPrice}
//               rating={course.rating}
//               imageSrc={course.imageSrc}
//               bestSeller={course.bestSeller}
//               onClick={() => handleCourseClick(course.id)}
//             />
//           ))}
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Course;
