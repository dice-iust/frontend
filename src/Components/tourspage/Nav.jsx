import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import "./Nav.scss"
import { SiTide } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import LogoImg from "../tourspage/Assests/logo.png";
import { Link } from 'react-router-dom'; 
import { FiInfo } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { BiLogOutCircle } from "react-icons/bi";

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
         <Link to="/Main" className="link_class"> <h3 className="trip-title" >Trip Tide</h3> </Link>
          </div>
            <nav ref={navref}>  
              <button className="nav-btn nav-close-btn" onClick={showNavbar}>  
                <FaTimes />  
              </button> 
              <div className="n-contents">
              <Link to="/budgetplanner"><a href="/"><FiInfo className="moveaicon"/> About</a></Link>
              <Link to="/EditProfile"><a href="/"><CgProfile className="moveaicon"/> Profile</a> </Link> 
              <Link to="/"><a href="/"><BiLogOutCircle  className="moveaicon"/>Logout</a> </Link> 
              </div> 
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
