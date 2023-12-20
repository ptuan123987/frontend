import { ReactElement, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/Home";
import CoursePage from "../pages/courses/CoursePage";
import Profile from "../pages/user/Profile";
import ChangePassword from "../pages/user/ChangePassword";
import GithubLanding from "../pages/GithubLanding";
import GoogleLanding from "../pages/GoogleLanding";
import Dashboard from "../../admin/pages/Dashboard";
import AdminLogin from "../../admin/pages/AdminLogin";
import AdminCourse from "../../admin/pages/AdminCourse";
import Students from "../../admin/pages/Students";
import Analytics from "../../admin/pages/Analytics";
import NotFound from "../pages/NotFound";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
const AppRoutes = () => {
  const navigate = useNavigate();

  

  function moveToAdminLogin() {
    navigate("/admin/login");
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Categories route */}
      <Route path="/development" element={<CoursePage />} />
      <Route path="/business" element={<CoursePage />} />
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/response-password-reset/*"element={<ResetPassword/>} />

      <Route path="/callback/github/*" element={<GithubLanding />} />
      <Route path="/callback/google/*" element={<GoogleLanding />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="*" element={<NotFound />} />


      <Route path="/admin/login" element={<AdminLogin />}></Route>

      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/course" element={<AdminCourse />} />
      <Route path="/admin/students" element={<Students />} />
      <Route path="/admin/analytics" element={<Analytics />} />
    </Routes>
  );
};

export default AppRoutes;
