import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import "./Nav.scss"
import { SiTide } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";

function Navbar() {
  const navref = useRef();
  const showNavbar = () => {
    navref.current.classList.toggle("responsive_nav");
  };
  return (
    <div className="nav-page">
    <header>
      <h3>
        Trip Tide
      </h3>
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
  );
}
export default Navbar;
