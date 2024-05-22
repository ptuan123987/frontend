import React from 'react';
import { Link } from 'react-router-dom'; 

const Footer = () => {
  return (
    <footer className="mt-[100px] inset-x-0 bottom-0 bg-zinc-900 text-white px-6 md:px-12 pt-10 text-sm text-center">
      <div className="container mx-auto mb-12">
        <div className="grid grid-cols-12 gap-y-4 md:gap-y-0">
          <div className="col-span-12 md:col-span-4">
            <div className="flex flex-col gap-y-2">
              <p>
                <Link to="/notfound" className="hover:underline">
                  Udemy Business
                </Link>
              </p>
              <p>
                <Link to="/notfound" className="hover:underline">
                  Teach on Udemy
                </Link>
              </p>
              <p>
                <Link to="/notfound" className="hover:underline">
                  Get the app
                </Link>
              </p>
              <p>
                <Link to="/notfound" className="hover:underline">
                  About us
                </Link>
              </p>
              <p>
                <Link to="/notfound" className="hover:underline">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="flex flex-col gap-y-2">
              <p>
                <Link to="/notfound" className="hover:underline">
                  Careers
                </Link>
              </p>
              <p>
                <Link to="/notfound" className="hover:underline">
                  Blog
                </Link>
              </p>
              <p>
                <Link to="/notfound" className="hover:underline">
                  Help and support
                </Link>
              </p>
              <p>
                <Link to="/notfound" className="hover:underline">
                  Affiliate
                </Link>
              </p>
              <p>
                <Link to="/notfound" className="hover:underline">
                  Investors
                </Link>
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="flex flex-col gap-y-2">
              <p>
                <Link to="/notfound" className="hover:underline">
                  Terms
                </Link>
              </p>
              <p>
                <Link to="/notfound" className="hover:underline">
                  Privacy policy
                </Link>
              </p>
              <p>
                <Link to="/notfound" className="hover:underline">
                  Cookie settings
                </Link>
              </p>
              <p>
                <Link to="/notfound" className="hover:underline">
                  Sitemap
                </Link>
              </p>
              <p>
                <Link to="/notfound" className="hover:underline">
                  Accessibility statement
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center py-8 text-sm">
        <Link to="/" className='mb-4 md:mb-0'>
          <img 
            src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg" 
            className="h-8 filter invert" 
            alt="Udemy Logo" 
          />
        </Link>
        <span className="text-xs">© 2024 Udemy, Inc.</span>
      </div>
    </footer>
  );
};

export default Footer;
