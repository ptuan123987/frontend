import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/Home";
import CoursePage from "../pages/courses/CoursePage";
import CourseList from "../pages/courses/CourseList";
import Profile from "../pages/user/Profile";
import ChangePassword from "../pages/user/ChangePassword";
import MyLearning from "../pages/user/MyLearning";
import Wishlist from "../pages/user/Wishlist";
import GithubLanding from "../pages/GithubLanding";
import GoogleLanding from "../pages/GoogleLanding";
import Dashboard from "../../admin/pages/Dashboard";
import AdminLogin from "../../admin/pages/AdminLogin";
import AdminAddCourse from "../../admin/pages/AdminAddCourse";
import Students from "../../admin/pages/Students";
import Analytics from "../../admin/pages/Analytics";
import NotFound from "../pages/NotFound";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import LecturePage from "../pages/lecture/LecturePage";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import AdminAddChapter from "../../admin/pages/AdminAddChapter";
import AdminAddLecture from "../../admin/pages/AdminAddLecture";
import AdminAddChapterExistCourse from "../../admin/pages/AdminAddChapterExistCourse";
import AdminAddLectureExistChapter from "../../admin/pages/AdminAddLectureExistChapter";
import AdminEditCourse from "../../admin/pages/AdminEditCourse";
import AdminEditChapter from "../../admin/pages/AdminEditChapter";
import AdminEditLecture from "../../admin/pages/AdminEditLecture";
import PaymentLanding from "../pages/user/PaymentLanding";
import ReactLoading from 'react-loading';


const UserRoute = ({ element }) => {
  const isLoggedIn = AuthService.isLoggedIn();

  return isLoggedIn ? element : <Navigate to="/" />;
};

// const PaymentSuccessRoute = ({element} => {

// })

const AdminRoute = ({ element }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AuthService.profile().then(user => {
      setCurrentUser(user);
      setIsLoading(false);
    }).catch(error => {
      console.error("Error fetching user profile:", error);
      setCurrentUser(null);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className=" flex fixed left-[50%] top-[50%] transform  w-full h-full">
    <ReactLoading type="spin" color="#000" height={50} width={50} />
    </div>;
  }

  if (!currentUser || !currentUser.data || currentUser.data.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return element;
};

const AppRoutes = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/response-password-reset/*" element={<ResetPassword />} />
      <Route path="/callback/github/*" element={<GithubLanding />} />
      <Route path="/callback/google/*" element={<GoogleLanding />} />
      <Route
        path="/course/:courseId/chapter/:chapterId/lecture/:lectureId"
        element={<UserRoute element={<LecturePage />} />}
      />
       <Route path="/category/:categoryId" element={<CourseList />} />
      <Route
        path="/change-password"
        element={<UserRoute element={<ChangePassword />} />}
      />
      <Route path="/profile" element={<UserRoute element={<Profile />} />} />
      <Route
        path="/my-learning"
        element={<UserRoute element={<MyLearning />} />}
      />
      <Route path="/wishlist" element={<UserRoute element={<Wishlist />} />} />
      <Route
        path="/user/check-out/success/*"
        element={<UserRoute element={<PaymentLanding />} />}
      />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminRoute element={<Dashboard />} />} />
      <Route path="/admin/add-course" element={<AdminRoute element={<AdminAddCourse />} />} />
      <Route path="/admin/add-course/add-chapter" element={<AdminRoute element={<AdminAddChapter />} />} />
      <Route path="/admin/add-course/add-chapter/add-lecture" element={<AdminRoute element={<AdminAddLecture />} />} />
      <Route path="/admin/add-chapter" element={<AdminRoute element={<AdminAddChapterExistCourse />} />} />
      <Route path="/admin/add-lecture" element={<AdminRoute element={<AdminAddLectureExistChapter />} />} />
      <Route path="/admin/course" element={<AdminRoute element={<AdminAddCourse />} />} />
      <Route path="/admin/students" element={<AdminRoute element={<Students />} />} />
      <Route path="/admin/analytics" element={<AdminRoute element={<Analytics />} />} />
      <Route path="/admin/edit-course" element={<AdminRoute element={<AdminEditCourse />} />} />
      <Route path="/admin/edit-chapter" element={<AdminRoute element={<AdminEditChapter />} />} />
      <Route path="/admin/edit-lecture" element={<AdminRoute element={<AdminEditLecture />} />} />

      <Route path="/course/:courseId" element={<CoursePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
