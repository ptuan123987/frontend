import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PageLayout = ({ title, description, children }) => {
  
  return (
    <>
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link href="/favicon.png" rel="icon" />
      </head>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default PageLayout;
