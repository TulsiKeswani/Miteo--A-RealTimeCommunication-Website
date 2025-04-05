import React from 'react';
import videoCallIcon from "/assets/video-call.png";
import Dropdown from "./Dropdown.jsx";
import "./Navbar.css"
import { useNavigate } from "react-router-dom";
import  { useState,useEffect } from 'react';
import axios from "axios";
import server from "../../environment.js";
function Navbar() {
  const[login,setLogin] = useState();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        let result = await axios.get(
          `${server}/api/v1/miteo/user/getCookie`,
          { withCredentials: true }
        );
        if (!result.data.success) {
          setLogin(false);
        } else {
          setLogin(true);
        }
      } catch (error) {
        console.error("Error checking cookie:", error);
      }
    };

    checkAuth(); // Function ko call karna zaroori hai
  }, []);
  const navigate = useNavigate();
    return (
        <nav className="landingPageNavbar">
        <div className="logo">
          <img src={videoCallIcon} />
          <h2 style={{fontSize : "2.5rem"}} onClick={() => {navigate("/")}}>Miteo</h2>
        </div>
        <div className="nav_items">
          <p className="links" onClick={() => {navigate("/home")}}>Join As Guest</p>
          <p className="links" onClick={() => {navigate("/auth?type=signup")}}>Register</p>
          <button className="links" onClick={() => {navigate("/auth?type=login")}}>Login</button>
          <Dropdown></Dropdown>
        </div>
      </nav>

     );
}

export default Navbar;