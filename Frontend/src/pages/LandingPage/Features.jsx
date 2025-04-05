import React from "react";
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MessageIcon from '@mui/icons-material/Message';

export default function Features() {
  return (
    <div className="Features">
        <div className="box1 box">
            <HeadsetMicIcon className="audio icon" style={{color : "green"}}></HeadsetMicIcon>
            <p className="Feature">Audio And HD Video Calling</p>
            <p className="description">Enjoy crystal-clear audio and high-quality video calls with seamless connectivity.</p>
        </div>

        <div className="box2 ">
            <LiveTvIcon className="screen_sharing icon" style={{color : "navy"}}></LiveTvIcon>
            <p className="Feature">Screen Sharing</p>
            <p className="description"> your screen for meetings, presentations, or troubleshooting.</p>
        </div>

        <div className="box3 ">
            <MessageIcon className="message icon" style={{color: "darkmagenta"}}></MessageIcon>
            <p className="Feature">Smart Messaging</p>
            <p className="description">Stay connected with smart messaging, ensuring fast, secure, and real-time communication.</p>
        </div>
        
    </div>
  );
}
