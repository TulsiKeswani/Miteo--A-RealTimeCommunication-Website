import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Content() {
  const navigate = useNavigate();
  return (
    <div className="rapper">
      <p className="heading">Connect anywhere, anytime</p>
      <div className="about_web">
        <p>
          Experience seamless and secure video conferencing with crystal-clear
          audio and video. Connect with your team, friends, or clients from
          anywhere in the world effortlessly, reliably, and in real-time!
        </p>
        <button onClick={() => {navigate("/auth?type=signup")}}>Register Now!</button>
      </div>
    </div>
  );
}
