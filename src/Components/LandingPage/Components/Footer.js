import React from "react";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import "./landing.css";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-icons">
        <a href="" target="_blank" rel="noopener noreferrer">  
            <BsTwitter />  
          </a>  
          <a href="" target="_blank" rel="noopener noreferrer">  
            <SiLinkedin />  
          </a>  
          <a href="" target="_blank" rel="noopener noreferrer">  
            <BsYoutube />  
          </a>  
          <a href="" target="_blank" rel="noopener noreferrer">  
            <FaFacebookF />   
          </a>  

        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span>Help</span>
          <span>Share</span>
        </div>
        <div className="footer-section-columns">
          <span>pressnumber</span>
          <span></span>
          <span>pressemail</span>
          
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
