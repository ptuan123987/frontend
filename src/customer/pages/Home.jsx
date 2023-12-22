import React from "react";
import Layout from "../components/Layout";
import Slide from "../components/slides/Slides";
import Carousel from "../components/carousels/Carousels";
import CarouselControls from "../components/carousels/CarouselControls";
import Card1 from "../components/cards/Card1";
import CoursesSlide from "../components/slides/CoursesSlide";
import Button2 from "../components/buttons/Button2";
import Button1 from "../components/buttons/Button1";
import { useNavigate } from "react-router-dom";

const fakeCategories = [
  {
    id: 1,
    title: "Category1",
    link: "/category1",
    courses: [
      {
        id: 1,
        title: "React Fundamentals",
        link: "/react-fundamentals",
        image: "assets/images/course.png",
        instructor: {
          name: "John Doe",
        },
        rating: 4.5,
        ratings_count: 120,
        price: 19.99,
        inflated_price: 29.99,
        time_updated: 'July 2023',
        description: 'Learn javascript online and supercharge your web design with this Javascript for beginners training course.'
      },
      {
        id: 2,
        title: "Node.js Masterclass",
        link: "/nodejs-masterclass",
        image: "assets/images/course.png",
        instructor: {
          name: "Jane Smith",
        },
        rating: 4.8,
        ratings_count: 150,
        price: 24.99,
        inflated_price: 39.99,
        time_updated: 'August 2023',
        description: 'Learn: HTML | CSS | JavaScript | Web programming | Web development | Front-end | Responsive | JQuery'
      },
      {
        id: 3,
        title: "React Fundamentals",
        link: "/react-fundamentals",
        image: "assets/images/course.png",
        instructor: {
          name: "John Doe",
        },
        rating: 4.5,
        ratings_count: 120,
        price: 19.99,
        inflated_price: 29.99,
      },
      {
        id: 4,
        title: "Node.js Masterclass",
        link: "/nodejs-masterclass",
        image: "assets/images/course.png",
        instructor: {
          name: "Jane Smith",
        },
        rating: 4.8,
        ratings_count: 150,
        price: 24.99,
        inflated_price: 39.99,
      },
      {
        id: 5,
        title: "React Fundamentals",
        link: "/react-fundamentals",
        image: "assets/images/course.png",
        instructor: {
          name: "John Doe",
        },
        rating: 4.5,
        ratings_count: 120,
        price: 19.99,
        inflated_price: 29.99,
      },
      {
        id: 6,
        title: "Node.js Masterclass",
        link: "/nodejs-masterclass",
        image: "assets/images/course.png",
        instructor: {
          name: "Jane Smith",
        },
        rating: 4.8,
        ratings_count: 150,
        price: 24.99,
        inflated_price: 39.99,
      },
    ],
  },
  {
    id: 2,
    title: "Category2",
    link: "/category2",
    courses: [
      {
        id: 1,
        title: "React Fundamentals",
        link: "/react-fundamentals",
        image: "assets/images/course.png",
        instructor: {
          name: "John Doe",
        },
        rating: 4.5,
        ratings_count: 120,
        price: 19.99,
        inflated_price: 29.99,
      },
      {
        id: 2,
        title: "Node.js Masterclass",
        link: "/nodejs-masterclass",
        image: "assets/images/course.png",
        instructor: {
          name: "Jane Smith",
        },
        rating: 4.8,
        ratings_count: 150,
        price: 24.99,
        inflated_price: 39.99,
      },
    ],
  },
];

const carouselItems = [
  {
    imgSrc: "assets/images/carousel-1.jpg",
    title: "Learning that gets you",
    description:
      "Skills for your present (and your future). Get started with us.",
  },
  {
    imgSrc: "/assets/images/carousel-2.jpg",
    title: "Unlock the power of your people",
    description:
      "Udemy Business is trusted by 12.5K+ companies around the world. Find out what we can do for yours.",
    buttonLabel: "Request a demo",
  },
  {
    imgSrc: "assets/images/carousel-3.jpg",
    title: "New to Udemy? Lucky you.",
    description:
      "Enjoy new-learner savings with courses starting at $12 for a very limited time.",
  },
  {
    imgSrc: "assets/images/carousel-4.jpg",
    title: "Build ready-for-anything teams",
    description:
      "See why leading organizations choose to learn with Udemy Business.",
    buttonLabel: "Request a demo",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const appName = "Udemy";
  console.log(fakeCategories);
  return (
    <Layout>
      <section>
        <Carousel>
          {carouselItems.map((item, index) => (
            <div key={index} className="relative">
              <img
                src={item.imgSrc}
                className="h-44 w-full md:h-full object-cover object-center"
                alt="..."
              />
              <div className="relative md:absolute md:w-[28rem] md:top-14 md:left-20 bg-white p-8 md:shadow-[0px_2px_4px_0px_#00000024]">
                <h1 className="text-3xl font-black font-SuisseWorks mb-3">
                  {item.title}
                </h1>
                <p className="text-lg">{item.description}</p>
                {item.buttonLabel && <Button2>{item.buttonLabel}</Button2>}
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      <section className="p-5 mb-5">
        {fakeCategories.map((category, index) => {
          const categoryId = index + 1; // Tăng categoryId mỗi lần lặp

          return (
              <div key={category.id}>
                <h2 className="text-3xl font-extrabold font-SuisseWorks mb-3">
                  A broad selection of courses in {category.title}
                </h2>
                <p className="text-xl font-light">
                  Choose from over {category.courses.length} online video courses
                  with new additions published every month
                </p>
                <div className="mb-1">
                  <ul
                      className="flex flex-wrap -mb-px text-base font-bold text-center"
                      role="tablist"
                  >
                    {category.title}
                  </ul>
                </div>
                <div className="">
                  <CoursesSlide categoryId={String(categoryId)} />
                  <Button1>Explore {category.title}</Button1>
                </div>
              </div>
          );
        })}
      </section>

      <section className="px-5 md:px-44 pt-16 md:py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-5 mb-10 md:mb-20">
            <div className="col-span-12 md:col-span-6">
              <div className="flex flex-col items-center md:items-start">
                <img
                  className="mb-5"
                  src="assets/images/logo-ub.svg"
                  width="192"
                  height="32"
                  alt="Udemy Business Logo"
                />
                <h3 className="font-SuisseWorks text-4xl mb-5 mx-auto">
                  Upskill your team with Udemy Business
                </h3>
                <ul className="list-disc list-outside text-xl grid gap-y-2 ms-5 mb-5">
                  <li>
                    Unlimited access to 22,000+ top Udemy courses, anytime,
                    anywhere
                  </li>
                  <li>International course collection in 14 languages</li>
                  <li>Top certifications in tech and business</li>
                </ul>
              </div>
              <div className="flex flex-col md:flex-row">
                <Button2 className="text-lg font-black">
                  Get Udemy Business
                </Button2>
                <Button1 className="text-lg font-black">Learn more</Button1>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 order-first md:order-none">
              <div className="ms-0 md:ms-16">
                <img
                  src="assets/images/UB_Promo_1200x1200.jpg"
                  alt="Udemy Business Promo"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-5 mb-20">
            <div className="col-span-12 md:col-span-6">
              <img
                src="assets/images/instructor-2x-v3.jpg"
                alt="Instructor Image"
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="ms-0 md:ms-16 mt-0 md:mt-28 text-center">
                <h3 className="font-SuisseWorks text-2xl md:text-3xl mb-5">
                  Become an instructor
                </h3>
                <p className="mb-5 text-base md:text-lg">
                  Instructors from around the world teach millions of students
                  on Udemy. We provide the tools and skills to teach what you
                  love.
                </p>
                <Button2 className="text-lg font-black w-full md:w-auto">
                  Start teaching today
                </Button2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Home;
