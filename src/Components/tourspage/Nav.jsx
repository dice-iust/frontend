import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import "./Nav.scss"
import { SiTide } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import LogoImg from "../tourspage/Assests/logo.png"

function Navbar() {
  const navref = useRef();
  const showNavbar = () => {
    navref.current.classList.toggle("responsive_nav");
  };
  return (
    <div className="nav-page">
      <div class="home-back">
        <header>
          <div class="logo">
              <img src={LogoImg} alt="Logo"></img>
              <h3 className="trip-title" >Trip Tide</h3> 
          </div>
            <nav ref={navref}>  
              <button className="nav-btn nav-close-btn" onClick={showNavbar}>  
                <FaTimes />  
              </button>  
              <a href="/">About</a>  
              <a href="/">Profile</a>  
            </nav>  
            <button className="nav-btn" onClick={showNavbar}>  
              <FaBars />  
            </button>
        </header>
        
        </div>  
        <div className="search__container">  
        <input class="search__input" type="text" placeholder="Search ..." />
      </div>
    </div>
  );
}
export default Navbar;
