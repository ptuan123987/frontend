import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/Home";
import GithubLanding from "../pages/GithubLanding";
import GoogleLanding from "../pages/GoogleLanding";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route path="/callback/github/*" element={<GithubLanding/>} />
      <Route path="/callback/google/*" element={<GoogleLanding/>} />
    </Routes>
  );
};

export default AppRoutes;
