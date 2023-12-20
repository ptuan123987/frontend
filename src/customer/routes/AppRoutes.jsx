import { ReactElement,useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/Home";
import CoursePage from '../pages/courses/CoursePage';
import Profile from "../pages/user/Profile";
import Photo from "../pages/user/Photo";
import MyLearning from "../pages/user/MyLearning";
import Wishlist from "../pages/user/Wishlist";
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

 
  const checkAdminRole = (requiredRole) => {
    try {
      const userRole = AuthService.profile();
      console.log(userRole.data.role);
  
      return userRole === requiredRole;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    checkAdminRole();
  }, []);

  const PrivateRoute = ({ element, requiredRole, fallback }) => {
    return checkAdminRole(requiredRole) ? element : fallback;
  };

  function moveToLogin() {
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

      <Route path="/callback/github/*" element={<GithubLanding />} />
      <Route path="/callback/google/*" element={<GoogleLanding />} />
      
      {/* User route */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/photo" element={<Photo />} />
      <Route path="/mylearning" element={<MyLearning />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="*" element={<NotFound />} />

      {/* Admin route */}
      {/* <Route path="/admin/login" element={<AdminLogin />}></Route> */}

      {/* <Route
        path="/admin"
        element={
          <PrivateRoute
            element={<Dashboard />}
            requiredRole="admin"
            fallback={moveToLogin()}
          />
        }
      />
      <Route
        path="/admin/course"
        element={
          <PrivateRoute
            element={<AdminCourse />}
            requiredRole="admin"
            fallback={moveToLogin()}
          />
        }
      />
      <Route
        path="/admin/students"
        element={
          <PrivateRoute
            element={<Students />}
            requiredRole="admin"
            fallback={moveToLogin()}
          />
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <PrivateRoute
            element={<Analytics />}
            requiredRole="admin"
            fallback={moveToLogin()}
          />
        }
      /> */}
    </Routes>
  );
};

export default AppRoutes;
