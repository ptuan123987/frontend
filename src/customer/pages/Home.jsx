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

const fakeSubCategoryStore = {
  groupByCategory: {
    6: [
      {
        id: 1,
        title: "Category1",
        link: "/category1",
      },
    ],
  },
};

const fakeCourseStore = {
  groupBySubCategory: {
    1: [
      {
        id: 1,
        title: "Course 1",
        name: "Course Name 1",
        link: "/course1",
      },
    ],
  },
};

const Home = () => {
  const navigate = useNavigate();
  const appName = "Udemy";
  const subCategoryStore = fakeSubCategoryStore;
  const courseStore = fakeCourseStore;
  return (
    <Layout
      title={`Online Courses - Learn Anything, On Your Schedule | ${
        (window && window.props && window.props.appName) || "DefaultAppName"
      }`}
      description="hello"
    >
      <section>
        <Carousel>
          {/* Item 1 */}
          <div className="relative">
            <div>
              <img
                src="assets/img/carousel-1.jpg"
                className="h-44 w-full md:h-full object-cover object-center"
                alt="..."
              />
            </div>
            <div className="relative md:absolute md:w-[28rem] md:top-14 md:left-20 bg-white p-8 md:shadow-[0px_2px_4px_0px_#00000024]">
              <h1 className="text-3xl font-black font-SuisseWorks mb-3">
                Learning that gets you
              </h1>
              <p className="text-lg">
                Skills for your present (and your future). Get started with us.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="relative">
            <img
              src="/assets/img/carousel-2.jpg"
              className="h-44 w-full md:h-full object-cover object-center"
              alt="..."
            />
            <div className="relative md:absolute md:w-[28rem] md:top-14 md:left-20 bg-white p-8 md:shadow-[0px_2px_4px_0px_#00000024]">
              <h1 className="text-3xl font-black font-SuisseWorks mb-3">
                Unlock the power of your people
              </h1>
              <p className="text-base mb-3">
                Udemy Business is trusted by 12.5K+ companies around the world.
                Find out what we can do for yours.
              </p>
              <Button2>Request a demo</Button2>
            </div>
          </div>

          {/* Item 3 */}
          <div className="relative">
            <img
              src="assets/img/carousel-3.jpg"
              className="h-44 w-full md:h-full object-cover object-center"
              alt="..."
            />
            <div className="relative md:absolute md:w-[28rem] md:top-14 md:left-20 bg-white p-8 md:shadow-[0px_2px_4px_0px_#00000024]">
              <h1 className="text-3xl font-black font-SuisseWorks mb-3">
                New to Udemy? Lucky you.
              </h1>
              <p className="text-base mb-3">
                Enjoy new-learner savings with courses starting at $12 for a
                very limited time.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="relative">
            <img
              src="assets/img/carousel-4.jpg"
              className="h-44 w-full md:h-full object-cover object-center"
              alt="..."
            />
            <div className="relative md:absolute md:w-[28rem] md:top-14 md:left-20 bg-white p-8 md:shadow-[0px_2px_4px_0px_#00000024]">
              <h1 className="text-3xl font-black font-SuisseWorks mb-3">
                Build ready-for-anything teams
              </h1>
              <p className="text-base mb-3">
                See why leading organizations choose to learn with Udemy
                Business.
              </p>
              <Button2>Request a demo</Button2>
            </div>
          </div>
        </Carousel>
      </section>

      <section className="p-5 mb-5">
        <h2 className="text-3xl font-extrabold font-SuisseWorks mb-3">
          A broad selection of courses
        </h2>
        <p className="text-xl font-light">
          Choose from over 210,000 online video courses with new additions
          published every month
        </p>
        <div className="mb-1">
          <ul
            className="flex flex-wrap -mb-px text-base font-bold text-center"
            data-tabs-toggle="#coursesTab"
            role="tablist"
          >
            {subCategoryStore.groupByCategory &&
              subCategoryStore.groupByCategory[6].map((row, index) => (
                <li key={index} className="mr-2" role="presentation">
                  <button
                    className={`inline-block p-4 text-gray-500 aria-selected:text-gray-950`}
                    data-tabs-target={`#${row.title}-tab`}
                    type="button"
                    role="tab"
                  >
                    {row.title}
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <div id="coursesTab" className="border border-stone-400">
          {/* Loop through subcategories */}
          {subCategoryStore.groupByCategory &&
            subCategoryStore.groupByCategory[6].map((row, index) => (
              <div
                key={index}
                className="hidden p-3 md:p-10"
                id={`${row.title}-tab`}
                role="tabpanel"
              >
                <h2 className="font-UdemySansBold text-2xl tracking-tight">
                  Expand your career opportunities with {row.title}
                </h2>
                <p className="line-clamp-3 text-ellipsis md:w-2/3">
                  Take one of {appName}'s range of {row.title} courses and learn
                  how to code using this incredibly useful language. Its simple
                  syntax and readability makes {row.title} perfect for Flask,
                  Django, data science, and machine learning. You’ll learn how
                  to build everything from games to sites to apps. Choose from a
                  range of courses that will appeal to
                </p>
                <Button1>Explore {row.title}</Button1>
                {/* Get only courses that belong to that subcategory */}
                {courseStore.groupBySubCategory && (
                  <CoursesSlide
                    courses={courseStore.groupBySubCategory[row.id]}
                  />
                )}
              </div>
            ))}
        </div>
      </section>
    </Layout>
  );
};
export default Home;
