import React, { useState, useContext,useEffect } from "react";
import withAuth from "../../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import videoCallIcon from "/assets/video-call.png";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AuthContext } from "../../contexts/AuthContext";

import server from "../environment.js";
function Home() {
  const [login, setLogin] = useState();
  const navigate = useNavigate();
  const [meetingCode, setMettingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);
  let handleVideoCall = async () => {
    {login === true ? await addToUserHistory(meetingCode) : navigate(`/${meetingCode}`)}
    
    navigate(`/${meetingCode}`);
  };

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

  return (
    <div>
      <nav className="HomePageNavbar">
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
                navigate("/auth?type=login");
              }}
            >
              <b>Login</b>
            </p>
            <button
              className="links"
              onClick={() => {
                navigate("/auth?type=signup");
              }}
            >
              Signup
            </button>
          </div>
        )}
      </nav>

      <div className="meet_container">
        <div className="genrate_meeting">
          <h2>Miteo – Your Gateway to Effortless Video Calls</h2>
          <p>
            Bringing people closer – seamless connections, endless conversations
          </p>
          <div style={{ display: "flex" }}>
            <TextField
              id="outlined-basic"
              label="Enter Meeting Code"
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "rgb(243, 93, 39,0.5)", // Change outline color on focus
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "grey" },
              }}
              onChange={(e) => setMettingCode(e.target.value)}
            />
            &nbsp;
            <Button variant="contained" onClick={handleVideoCall}>
              Join
            </Button>
          </div>
        </div>
        <div className="meeting_logo">
          <img src="/assets/meetin_image.png" alt="Meeting_image" />
        </div>
      </div>
    </div>
  );
}

export default Home;
