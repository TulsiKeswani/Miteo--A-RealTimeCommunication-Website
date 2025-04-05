import axios from "axios";
import React, { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import httpStatus from "http-status";
export const AuthContext = createContext({});

import server from "../environment.js";
const client = axios.create({
  baseURL: `${server}/api/v1/miteo/user`,
});

export const AuthProvider = ({ children }) => {
  const router = useNavigate();
  const authContext = useContext(AuthContext);

  const [userData, setUserData] = useState(authContext);

  const handleRegister = async (name, username, password) => {
    try {
      let request = await client.post("/signup", {
        name: name,
        username: username,
        password: password,
      });

      if (request.status === httpStatus.CREATED) {
        return request.data.message;
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      let request = await client.post(
        "/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );

      if (request.status === httpStatus.OK) {
        router("/Home");
      }
    } catch (error) {
      throw error;
    }
  };

  const addToUserHistory = async(meetingCode) => {
      try {
          let result = await client.post("/add_to_activity",{
            meeting_code : meetingCode
          },{ withCredentials: true });
          console.log(result);
          return result;
      } catch (error) {
          throw error;
      }
  }

  const getUserHistory = async () => {
      try {
        let request = await client.get("/get_all_activity",{ withCredentials: true });
        return request.data;
      } catch (error) {
          throw error;
      }
  }

  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
    getUserHistory,
    addToUserHistory
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
