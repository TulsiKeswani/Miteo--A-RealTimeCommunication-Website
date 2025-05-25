import React from "react";
import videoCallIcon from "/assets/video-call.png";
import Dropdown from "./Dropdown.jsx";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import server from "../../environment.js";
function Navbar() {
  const [login, setLogin] = useState();
  useEffect(() => {
    console.log(server);
    const checkAuth = async () => {
      try {
        let result = await axios.get(
          `${server}/api/v1/miteo/user/getCookie`,

          { withCredentials: true }
        );
        {
          console.log(result);
        }
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
  let handleLogout = async () => {
    try {
      await axios.post(
        `${server}/api/v1/miteo/user/logout`,
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  return (
    <nav className="landingPageNavbar">
    <div className="logo">
      <img src={videoCallIcon} />
      <h2>Miteo</h2>
    </div>
    {login === true ? (
      <div className="nav_items">
        <p
          className="links"
          onClick={() => {
            navigate("/history");
          }}
        >
          <b>History</b>
        </p>
        <button className="links" onClick={handleLogout}>
          Logout
        </button>
      </div>
    ) : (
      <div className="nav_items">
        <p
          className="links"
          onClick={() => {
            navigate("/home");
          }}
        >
          Join As Guest
        </p>
        <p
          className="links"
          onClick={() => {
            navigate("/auth?type=login");
          }}
        >
          Login
        </p>
        <button
          className="links"
          onClick={() => {
            navigate("/auth?type=signup");
          }}
        >
          Signup
        </button>
        <Dropdown className="dropdown"></Dropdown>
      </div>
      
    )}
  </nav>
  )}

export default Navbar;
