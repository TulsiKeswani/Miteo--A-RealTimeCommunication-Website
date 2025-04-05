import React from "react";

import "./Landingpage.css";
import Content from "./Content.jsx";
import Content2 from "./Content2.jsx";
import Features from "./Features.jsx";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";


export default function LandingPage() {


  
  return (
    
    <div className="landingPageContainer">
     
      <Navbar></Navbar>
      <div className="content">
        <Content></Content>
      </div>
      <div className="image">
        <img src="/assets/videocall_img.png" />
      </div>

      <div className="content2">
        <Content2></Content2>
      </div>

        <Features> </Features>
        <div className="footer">
            <Footer></Footer>
        </div>
        
    </div>
  );
}
