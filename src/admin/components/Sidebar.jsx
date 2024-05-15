import React, { useState } from "react";
import "./Sidebar.css";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import AuthService from "../../customer/services/AuthService";


const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true);
  const navigate = useNavigate();

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  // console.log(window.innerWidth)

  function moveToDashboard() {
    setSelected(0);
    navigate("/admin/dashboard");
  } 
  function moveToCourse() {
    setSelected(1);

    navigate("/admin/add-course");
  }
  function moveToChapter() {
    setSelected(2);
    
    navigate("/admin/add-chapter");
  }
  function moveToLecture() {
    setSelected(3);
    navigate("/admin/add-lecture");
  }
  function moveToStudents() {
    setSelected(4);

    navigate("/admin/students");
  }

  function moveToAnalytics() {
    setSelected(5);

    navigate("/admin/analytics");
  }
  const logout = () => {
    AuthService.logout();
    navigate("/admin/login")
  };

  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo ">
        <img src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg" alt="logo" />
        
      </div>

      <div className="menu">
          {/* Dashboard */}
          <div className={selected === 0 ? "menuItem active" : "menuItem"} 
            onClick={moveToDashboard}
          >
            <UilEstate />
            <span>Dashboard</span>
          </div>

          {/* Courses */}
          <div className={selected === 1 ? "menuItem active" : "menuItem"} onClick={moveToCourse}>
            <UilClipboardAlt />
            <span>Courses</span>
          </div>

          {/* Products */}
          <div  className={selected === 2 ? "menuItem active" : "menuItem"} onClick={moveToChapter}>
            <UilPackage />
            <span>Chapter</span>
          </div>

           {/* Products */}
           <div  className={selected === 3 ? "menuItem active" : "menuItem"} onClick={moveToLecture}>
            <UilPackage />
            <span>Lecture</span>
          </div>
          
          {/* Students */}
          <div  className={selected === 4 ? "menuItem active" : "menuItem"} onClick={moveToStudents}>
            <UilUsersAlt />
            <span>Students</span>
          </div>


          {/* Analytics */}
          <div
          className={selected === 5 ? "menuItem active" : "menuItem"} onClick={moveToAnalytics}>
            <UilChart />
            <span>Analytics</span>
          </div>

          {/* signoutIcon */}
          <div className="menuItem">
            <UilSignOutAlt onClick={logout}/>
          </div>
        </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
