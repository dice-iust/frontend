import React, { useRef } from "react";  
import { FaBars, FaTimes } from "react-icons/fa";  
import "./categories_nav.scss";  
import LogoImg from "../tourspage/Assests/logo.png";
import { Link } from 'react-router-dom';   

function Navbar_category() {
	const navref = useRef();
  const showNavbar = () => {
    navref.current.classList.toggle("responsive_nav");
  };

	return (
		<div className="nav-page">
      <div class="home-back-category">
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
        
        </div>  
       
    </div>
	);
}

export default Navbar_category;
