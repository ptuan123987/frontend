import React from 'react';
import { Link } from 'react-router-dom'; 
const Footer = () => {
  return (
    <footer className=" mt-[100px] inset-x-0 bottom-0 bg-zinc-900 text-white px-6 md:px-12 pt-10 text-sm text-center">
      <div className="container mx-auto mb-12">
        <div className="grid grid-cols-12">
          {/* Column 1 */}
          <div className="col-span-12 md:col-span-3">
            <div className="flex flex-col gap-y-2">
              <p>
                <Link to="#" className="hover:underline">
                  Udemy Business
                </Link>
              </p>
              <p>
                <Link to="#" className="hover:underline">
                  Teach on Udemy
                </Link>
              </p>
              <p>
                <Link to="#" className="hover:underline">
                  Get the app
                </Link>
              </p>
              <p>
                <Link to="#" className="hover:underline">
                  About us
                </Link>
              </p>
              <p>
                <Link to="#" className="hover:underline">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3">
            <div className="flex flex-col gap-y-2">
              <p>
                <Link to="#" className="hover:underline">
                  Careers
                </Link>
              </p>
              <p>
                <Link to="#" className="hover:underline">
                  Blog
                </Link>
              </p>
              <p>
                <Link to="#" className="hover:underline">
                  Help and support
                </Link>
              </p>
              <p>
                <Link to="#" className="hover:underline">
                  Affiliate
                </Link>
              </p>
              <p>
                <Link to="#" className="hover:underline">
                  Investors
                </Link>
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3">
            <div className="flex flex-col gap-y-2">
              <p>
                <Link to="#" className="hover:underline">
                  Terms
                </Link>
              </p>
              <p>
                <Link to="#" className="hover:underline">
                  Privacy policy
                </Link>
              </p>
              <p>
                <Link to="#" className="hover:underline">
                  Cookie settings
                </Link>
              </p>
              <p>
                <Link to="#" className="hover:underline">
                  Sitemap
                </Link>
              </p>
              <p>
                <Link to="#" className="hover:underline">
                  Accessibility statement
                </Link>
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3 md:justify-self-end order-first md:order-none">
            <button className="border border-white min-w-[9rem] px-3 py-2 text-base mb-8">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 stroke-2 me-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
                <span>English</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className=" flex flex-col md:flex-row justify-between py-8 text-sm mx-20 ">
        <Link to="#" className=''>
          <img src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg" 
          className="h-8 mb-5 center md:mb-0 filter invert m-auto" alt="Udemy Logo" />
        </Link>
        <span className="text-xs">© 2023 Udemy, Inc.</span>
      </div>
    </footer>
  );
};

export default Footer;
