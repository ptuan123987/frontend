import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Home from '../pages/Home';
import CoursePage from '../pages/courses/CoursePage';

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Categories route */}
        <Route path="/development" element={<CoursePage />} />
        <Route path="/business" element={<CoursePage />} />

      </Routes>
    );
  };
  
  export default AppRoutes;