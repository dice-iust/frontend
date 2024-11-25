import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import "./Nav.scss"
import { SiTide } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import LogoImg from "../tourspage/Assests/logo.png";
import { Link } from 'react-router-dom'; 

function Navbar() {
  const navref = useRef();
  const showNavbar = () => {
    navref.current.classList.toggle("responsive_nav");
  };
  return (
    <div className="nav-page">
      
        <header>
          <div class="logo">
              <img src={LogoImg} alt="Logo"></img>
              <h3 className="trip-title" >Trip Tide</h3> 
          </div>
            <nav ref={navref}>  
              <button className="nav-btn nav-close-btn" onClick={showNavbar}>  
                <FaTimes />  
              </button>  
              <Link to="/about"><a href="/">About</a></Link>
              <Link to="/EditProfile"><a href="/">Profile</a> </Link> 
            </nav>  
            <button className="nav-btn" onClick={showNavbar}>  
              <FaBars />  
            </button>
        </header>

        <div class="home-back"></div>
    </div>
  );
}
export default Navbar;
