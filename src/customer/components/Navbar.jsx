import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popover from "./Popover";
import Button2 from "./buttons/Button2";

const Navbar = () => {
  const fakeCategories = [
    { id: 1, title: "Category 1", a: "/category1" },
    { id: 2, title: "Category 2", a: "/category2" },
    { id: 3, title: "Category 3", a: "/category3" },
  ];

  const navigate = useNavigate();

  const [activePopover, setActivePopover] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  const handleMouseEnter = (popoverId) => {
    setActivePopover(popoverId);
  };

  const handleMouseLeave = () => {
    setActivePopover(null);
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
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-UdemySansBold"
                      data-popover-target="profilePopover"
                      data-popover-offset="20"
                      data-popover-placement="bottom"
                    >
                      <span>Tuấn</span>
                    </button>
                  </div>
                )}

                {/* Your mobile menu content */}
                <div className="flex  justify-center h-full">
                  <ul className="text-gray-900">
                    <li>
                      <a to="/">Home</a>
                    </li>
                    <li>
                      <a to="/category1">Category 1</a>
                    </li>
                    {/* Add more menu items as needed */}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        <div className=" max-w-screen-xl flex flex-wrap items-center justify-between p-2 md:p-4">
          <a onClick={moveToHome} to="/" className="flex items-center">
            <img
              src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
              className="h-8"
              alt="Logo"
            />
          </a>
        </div>

        <div
          className=" hidden md:flex flex-col md:flex-row items-start md:items-center justify-between w-full md:w-auto text-base md:text-sm gap-4 md:grow order-2 md:order-none p-4 md:p-0 border border-gray-100 rounded-lg md:border-0 mt-4 md:mt-0 bg-gray-50 md:bg-white"
          id="navbar-cta"
        >
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("categories")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="hover:text-purple-600 m-4"
              data-popover-target="categories"
              data-popover-offset="10"
              data-popover-placement="bottom"
            >
              Categories
            </button>
            {/* categories */}
            {activePopover === "categories" && (
              <Popover
                target="categories"
                className="text-sm text-gray-500 h-5/6 w-32 md:w-64"
              >
                <ul className=" text-gray-900 bg-white rounded-lg ">
                  {fakeCategories.map((item) => (
                    <li
                      key={item.id}
                      data-dropdown-toggle={`subCategory${item.id}Dropdown`}
                      data-dropdown-placement="right-start"
                      data-dropdown-trigger="hover"
                      data-dropdown-offset-distance="13"
                      data-dropdown-offset-skidding="-9"
                    >
                      <div className="flex items-center justify-between w-full py-2 hover:text-purple-600">
                        <a to={item.a}>{item.title}</a>
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
                      </div>
                    </li>
                  ))}
                </ul>
              </Popover>
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
            <input
              type="search"
              id="default-search"
              class="block h-full w-full p-0 pl-12 text-gray-900 border border-stone-900 bg-gray-50 rounded-full outline-none focus:outline-none"
              placeholder="Search for anything"
              required
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div
              class="relative ml-5"
              onMouseEnter={() => handleMouseEnter("activePopover")}
              onMouseLeave={handleMouseLeave}
            >
              <a to="/">Udemy Business</a>
              {activePopover === "activePopover" && (
                <Popover
                  target="activePopover"
                  className="max-w-xs text-xl p-2 font-extrabold"
                >
                  <p className="mb-5">
                    Get your team access to over 22,000 top Udemy courses,
                    anytime, anywhere.
                  </p>
                  <a href="#">
                    <Button2 className="!mb-0 w-full">
                      Try Udemy Business
                    </Button2>
                  </a>
                </Popover>
              )}
            </div>

            <div
              class="relative"
              onMouseEnter={() => handleMouseEnter("teachPopover")}
              onMouseLeave={handleMouseLeave}
            >
              <a to="/">Teach on Udemy</a>
              {activePopover === "teachPopover" && (
                <Popover
                  target="teachPopover"
                  className="max-w-xs text-xl p-2 font-extrabold"
                >
                  <p className="mb-5">
                    Turn what you know into an opportunity and reach millions
                    around the world.
                  </p>
                  <a href="#">
                    <Button2 className="!mb-0 w-full">Learn more</Button2>
                  </a>
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
            {activePopover === "cartPopover" && (
              <Popover
                target="cartPopover"
                className="py-5 px-16 text-center text-sm"
              >
                <p className="text-neutral-500  mb-5">Your cart is empty.</p>
                <p className="text-violet-800 font-extrabold">Keep shopping</p>
              </Popover>
            )}
          </div>

          {/* loggedOutSection */}
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

          {/* loggedInSection */}
          {isLoggedIn && (
            <div
              class="relative "
              onMouseEnter={() => handleMouseEnter("profilePopover")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-UdemySansBold"
                data-popover-target="profilePopover"
                data-popover-offset="20"
                data-popover-placement="bottom"
              >
                <span>Tuấn</span>
              </button>

              {activePopover === "profilePopover" && (
                <Popover
                  target="profilePopover"
                  className="max-w-xs !-right-2.5 py-5 w-[500px]  "
                >
                  <div className="flex items-center gap-2 px-2">
                    <div
                      className="flex items-center justify-center w-16 h-16 rounded-full
                   bg-black text-white font-UdemySansBold"
                      data-popover-target="profilePopover"
                      data-popover-offset="20"
                      data-popover-placement="bottom"
                    >
                      <span>Tuan</span>
                    </div>
                    <div className="flex flex-col items-start text-sm ">
                      <p className="font-UdemySansBold">TuanPhan</p>
                      <p className="text-neutral-500">ptuan123987@gmail.com</p>
                    </div>
                  </div>
                  <hr />
                  <ul className="space-y-2 text-zinc-800 hover:[&>*]:text-violet-700 px-2">
                    <li>My learning</li>
                    <li>My cart</li>
                    <li>Wishlist</li>
                  </ul>
                  <hr />
                  <ul className="space-y-2 text-zinc-800 hover:[&>*]:text-violet-700 px-2">
                    <li>
                      <a to="/logout">Log out</a>
                    </li>
                  </ul>
                </Popover>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
