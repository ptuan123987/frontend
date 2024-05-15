import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer, toast } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient()
const PageLayout = ({ children }) => {
  
  return (
    <>
    <QueryClientProvider client={queryClient}>
        <Navbar />
        {children}
        <ToastContainer/>
        <Footer />
    </QueryClientProvider>
    </>
  );
};

export default PageLayout;
