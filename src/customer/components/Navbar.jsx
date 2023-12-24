import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popover from "./Popover";
import Button2 from "./buttons/Button2";
import AuthService from "../../customer/services/AuthService";
import Button1 from "./buttons/Button1";
import useUserStore from "../stores/useUserStore";
import MyLearning from "../pages/user/MyLearning";
import SearchBar from "./SearchBar";
import CategoriesService from "../services/CategoriesService";
import CourseService from "../services/CourseService";
import {Link} from 'react-router-dom';

const Navbar = () => {
  const [categories, setCategories] = useState([null]);
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userData, setUserData } = useUserStore();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  const handleMouseEnter = (categoryId, subCategoryId, topicId) => {
    setActiveCategory(categoryId);
    setActiveSubCategory(subCategoryId);
    setActiveTopic(topicId);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
    setActiveSubCategory(null);
    setActiveTopic(null);
  };

  function moveToLogin() {
    navigate("/login");
  }
  function moveToSignup() {
    navigate("/signup");
  }
  function moveToHome() {
    navigate("/");
  }
  function moveToProfile() {
    navigate("/profile");
  }
  function moveToMyLearning() {
    navigate("/my-learning")
  }

  const moveToWishlist = () => {
    navigate('/wishlist');
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await AuthService.profile();
        setUserData(response.data);
        console.log(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoriesService.filterParentCategories();
        setCategories(data); 
        console.log(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  // const handleItemClick = async (name) => {
  //   try {
  //     const courses = await CourseService.getCoursesBySubCategoryId(id);
  //     navigate('/courses', { state: { courses } });
  //   } catch (error) {
  //     console.error('Failed to fetch courses', error);
  //   }
  // };

  const handleItemClick = (name, type, parentName) => {
    switch (type) {
      case 'category':
        navigate(`/course/${encodeURIComponent(name)}`);
        break;
      case 'subcategory':
        navigate(`/course/${encodeURIComponent(parentName)}/${encodeURIComponent(name)}`);
        break;
      case 'topic':
        navigate(`/topic/${encodeURIComponent(name)}`);
        break;
      default:
    }
  };
  
  const initials = useUserStore((state) => state.getInitials());
  console.log(initials);

  const logout = () => {
    AuthService.logout();
    setUserData(false);
    moveToLogin();
  };

  return (
    <nav className="bg-white border-gray-800 shadow-[0_2px_4px_rgba(0,0,0,0.08)] md:shadow-none ">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          className="inline-flex items-center p-2 text-sm zinc-900 rounded-lg md:hidden focus:outline-none focus:ring-0 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-cta"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>

        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transition-all duration-300"
              onClick={closeMobileMenu}
            ></div>
            <div className="fixed inset-y-0 right-0 w-3/4 bg-white z-50 transition-all ease-in-out duration-300">
              <div className="flex flex-col h-full">
                {!isLoggedIn && (
                  <div className="flex justify-center p-4">
                    <button
                      onClick={moveToLogin}
                      className="!mb-0 w-full md:w-auto block h-full px-4 py-2 text-gray-900 border border-stone-900 hover:bg-black hover:text-white transition-all duration-300"
                    >
                      Log in
                    </button>

                    <button
                      onClick={moveToSignup}
                      className="!mb-0 w-full md:w-auto block h-full px-4 py-2 text-gray-900 border border-stone-900 hover:bg-black hover:text-white transition-all duration-300"
                    >
                      Sign up
                    </button>
                  </div>
                )}

                {/* loggedInSection */}
                {isLoggedIn && (
                  <div
                    class="relative mx-auto my-5"
                    onMouseEnter={() => handleMouseEnter("profilePopover")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className="flex items-center justify-center w-20 h-20 rounded-full bg-black text-white font-UdemySansBold"
                      data-popover-target="profilePopover"
                      data-popover-offset="20"
                      data-popover-placement="bottom"
                    >
                      <span>{initials}</span>
                    </button>
                  </div>
                )}

                {/* Your mobile menu content */}
                <div className="flex justify-center h-full">
                  <ul className="text-gray-900">
                    <li className="group relative block">
                      <a
                        href=""
                        className="py-2 px-4 inline-block cursor-pointer"
                        onClick={moveToProfile}
                      >
                        Profile
                      </a>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                    </li>
                    <li className="group relative block">
                      <a
                        href=""
                        className="py-2 px-4 inline-block cursor-pointer"
                        onClick={MyLearning}
                      >
                        My Learning
                      </a>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                    </li>
                    <li className="group relative block">
                      <a
                        href=""
                        className="py-2 px-4 inline-block cursor-pointer"
                      >
                        My Cart
                      </a>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                    </li>
                    <li className="group relative block">
                      <a
                        href=""
                        className="py-2 px-4 inline-block cursor-pointer"
                      >
                        Wishlist
                      </a>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                    </li>
                    <li className="group relative block">
                      <a
                        className="py-2 px-4 inline-block cursor-pointer"
                        onClick={logout}
                      >
                        Log out
                      </a>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-2 md:p-4">
          <Link to="/" className="flex items-center">
            <img
              src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
              className="h-8"
              alt="Logo"
            />
          </Link>
        </div>

        <div
          className="hidden md:flex flex-col md:flex-row items-start md:items-center justify-between w-full md:w-auto text-base md:text-sm gap-4 md:grow order-2 md:order-none p-4 md:p-0 border border-gray-100 rounded-lg md:border-0 mt-4 md:mt-0 bg-gray-50 md:bg-white"
          id="navbar-cta"
        >
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("categories")}
            // onMouseLeave={handleMouseLeave}
          >
            <button
              className="hover:text-purple-600 m-4"
              data-popover-target="categories"
              data-popover-offset="10"
              data-popover-placement="bottom"
            >
              Categories
            </button>
            {/* -- CATEGORIES -- */}
            {activeCategory === "categories" && (
              // <Popover
              //   target="categories"
              //   className="text-sm text-gray-500 h-5/6 w-32 md:w-64 bg-white rounded-lg shadow-lg z-1"
              // >
              <div className="absolute w-32 md:w-64 z-10 bg-white rounded-lg shadow-lg">
                <ul className="text-gray-900">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className="relative"
                      onMouseEnter={() =>
                        handleMouseEnter("categories", category.id)
                      }
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="flex items-center justify-between w-full hover:text-purple-600">
                        <a
                          href={category.a}
                          onClick={(e) => {
                            e.preventDefault(); 
                            handleItemClick(category.name, 'category'); 
                          }}
                          className="flex items-center justify-between w-full py-3 px-4 hover:text-purple-600"
                        >
                          {category.name}
                        </a>
                        {category.subcategories && (
                          <svg
                            aria-hidden="true"
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        )}
                      </div>
                      {/* -- SUBCATEGORY -- */}
                      {category.subcategories &&
                      activeSubCategory === category.id &&
                        (
                          <div className="absolute left-full top-0 mt-1 w-48 md:w-64 bg-white shadow-lg z-10">
                            <ul>
                              {category.subcategories.map((subCategory) => (
                                <li
                                  key={subCategory.id}
                                  className="relative"
                                  onMouseEnter={() =>
                                    handleMouseEnter(
                                      "categories",
                                      category.id,
                                      subCategory.id
                                    )
                                  }
                                >
                                  <div className="flex items-center justify-between w-full py-1 hover:text-purple-600">
                                    <a
                                      href={subCategory.a}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleItemClick(subCategory.name, 'subcategory', category.name);
                                      }}
                                      className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:text-purple-600"
                                    >
                                      {subCategory.name}
                                    </a>
                                    {subCategory.topics && (
                                      <svg
                                        aria-hidden="true"
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                          clipRule="evenodd"
                                        ></path>
                                      </svg>
                                    )}
                                  </div>
                                  {/* -- SUBSUBCATEGORY / TOPIC -- */}
                                  {subCategory.topics && 
                                    activeTopic === subCategory.id &&
                                    (
                                      <div className="absolute left-full top-0 mt-1 py-1 w-48 md:w-64 bg-white shadow-lg z-20">
                                        <ul>
                                          {subCategory.topics.map(
                                            (topic) => (
                                              <li
                                                key={topic.id}
                                              >
                                                <a
                                                  href={topic.a}
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    handleItemClick(topic.name, 'topic');
                                                  }}
                                                  className="block px-4 py-2 text-sm text-gray-700 hover:text-purple-600 hover:bg-gray-100"
                                                >
                                                  {topic.name}
                                                </a>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
              // </Popover>
            )}
          </div>

          <div class="relative h-[3.0rem] grow order-1 md:order-none w-full md:w-auto">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <SearchBar />
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div
              class="relative ml-5"
              onMouseEnter={() => handleMouseEnter("activePopover")}
              onMouseLeave={handleMouseLeave}
            >
              <a to="/">Udemy Business</a>
              {activeCategory === "activePopover" && (
                <Popover
                  target="activePopover"
                  className="max-w-xs text-xl p-2 font-extrabold"
                >
                  <p className="mb-5">
                    Get your team access to over 22,000 top Udemy courses,
                    anytime, anywhere.
                  </p>
                  <Link to="/notfound">
                    <Button2 className="!mb-0 w-full">
                      Try Udemy Business
                    </Button2>
                  </Link>
                </Popover>
              )}
            </div>

            <div
              class="relative"
              onMouseEnter={() => handleMouseEnter("teachPopover")}
              onMouseLeave={handleMouseLeave}
            >
              <a to="/">Teach on Udemy</a>
              {activeCategory === "teachPopover" && (
                <Popover
                  target="teachPopover"
                  className="max-w-xs text-xl p-2 font-extrabold"
                >
                  <p className="mb-5">
                    Turn what you know into an opportunity and reach millions
                    around the world.
                  </p>
                  <Link to="/notfound">
                    <Button2 className="!mb-0 w-full">Learn more</Button2>
                  </Link>
                </Popover>
              )}
            </div>
          </div>

          <div
            className="mx-3 relative"
            onMouseEnter={() => handleMouseEnter("cartPopover")}
            onMouseLeave={handleMouseLeave}
          >
            <a
              to="/"
              data-popover-target="cartPopover"
              data-popover-offset="25"
              data-popover-placement="bottom"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 stroke-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </a>
            {activeCategory === "cartPopover" && (
              <Popover
                target="cartPopover"
                className="py-5 px-16 text-center text-sm"
              >
                <p className="text-neutral-500  mb-5">Your cart is empty.</p>
                <p className="text-violet-800 font-extrabold">Keep shopping</p>
              </Popover>
            )}
          </div>

          {/* -- LOGOUT SECTION -- */}
          {!isLoggedIn && (
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-1 w-full md:w-auto ">
              <button
                className="!mb-0 w-full md:w-auto
              block h-full w-full px-4 py-2 mx-2 text-gray-900 border border-stone-900
              hover:bg-black hover:text-white transition-all duration-300
              "
                onClick={moveToLogin}
              >
                Log in
              </button>
              <button
                className="!mb-0 w-full md:w-auto
              block h-full w-full px-4 py-2 text-gray-900 border border-stone-900
              hover:bg-black hover:text-white transition-all duration-300
              "
                onClick={moveToSignup}
              >
                Sign up
              </button>
              <button className="hidden md:block !p-2 !mb-0 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 stroke-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* -- LOGIN SECTION -- */}
          {isLoggedIn && (
            <div
              class="relative "
              onMouseEnter={() => handleMouseEnter("profilePopover")}
            >
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-UdemySansBold"
                data-popover-target="profilePopover"
                data-popover-offset="20"
                data-popover-placement="bottom"
              >
                <span>{initials}</span>
              </button>

              {activeCategory === "profilePopover" && (
                <div className="absolute w-40 md:w-64 z-20 bg-white rounded-lg shadow-lg right-[0] top-[90%]">
                  <div className="flex items-center gap-2 p-2 text-center">
                    <div
                      className="flex items-center justify-center w-9 h-9 rounded-full
                   bg-black text-white font-UdemySansBold"
                      data-popover-target="profilePopover"
                      data-popover-offset="20"
                      data-popover-placement="bottom"
                    >
                      <span>{initials}</span>
                    </div>
                    <div className="flex flex-col items-start text-sm ">
                      <p className="font-UdemySansBold">
                        {userData.display_name}
                      </p>
                      <p className="text-neutral-500">{userData.email}</p>
                    </div>
                  </div>
                  <hr />
                  <ul className="space-y-2 text-zinc-800 hover:[&>*]:text-violet-700 px-2">
                    <li className="group relative block" onClick={moveToProfile}>
                      <span className="py-2 px-4 inline-block cursor-pointer">
                        Profile
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                    </li>
                    <li className="group relative block" onClick={moveToMyLearning}>
                      <span className="py-2 px-4 inline-block cursor-pointer">
                        My Learning
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                    </li>
                    <li className="group relative block">
                      <a
                        href=""
                        className="py-2 px-4 inline-block cursor-pointer"
                      >
                        My Cart
                      </a>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                    </li>
                    <li className="group relative block" onClick={moveToWishlist}>
                      <span className="py-2 px-4 inline-block cursor-pointer">
                        Wishlist
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                    </li>
                    <li className="group relative block">
                      <span className="py-2 px-4 inline-block cursor-pointer" onClick={logout}>
                        Log out
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;