import { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route,Navigate  } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Authentication from "./pages/Authentication/Authentication.jsx";
import Home from "./pages/Home/Home.jsx";
import VideoMeeting from "./pages/VideoMeeting/VideoMeeting.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx"
import { AuthProvider } from "./contexts/AuthContext.jsx";

import History from "./pages/History/history";
import "./App.css";

import axios from "axios";
import server from "./environment.js";

function App() {
  
  const [login, setLogin] = useState(null);
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
    
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={login === true ? <Navigate to="/home"/> : <LandingPage />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/home" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/:url" element={<VideoMeeting />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
