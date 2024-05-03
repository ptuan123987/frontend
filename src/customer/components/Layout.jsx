import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer, toast } from 'react-toastify';

const PageLayout = ({ children }) => {
  
  return (
    <>
      <Navbar />
      {children}
      <ToastContainer/>
      <Footer />
    </>
  );
};

export default PageLayout;
