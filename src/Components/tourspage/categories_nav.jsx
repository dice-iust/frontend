import React, { useRef } from "react";  
import { FaBars, FaTimes } from "react-icons/fa";  
import "./categories_nav.scss";  
import LogoImg from "../tourspage/Assests/logo.png";
import { Link } from 'react-router-dom'; 
import { CgProfile } from "react-icons/cg";
import { FiInfo } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { BiLogOutCircle } from "react-icons/bi";


function Navbar_category() {
	const navref = useRef();
  const showNavbar = () => {
    navref.current.classList.toggle("responsive_nav-category");
  };

	return (
		<div className="nav-page-category">
      
      <div class="home-back-category">
        <header>
        <div class="logo-category">
        <Link to="/Main">  <img src={LogoImg} alt="Logo-category"></img></Link>
        <Link to="/Main" className="linkclass"><h3 className="trip-title-category" >Trip Tide</h3> </Link>
          </div>
            <nav ref={navref}>  
              <button className="nav-btn-category nav-close-btn-category" onClick={showNavbar}>  
                <FaTimes />  
              </button> 
              <div className="contents">
              <Link to="/Main"><a href="/"><IoHomeOutline className="movepicon"/> Home</a></Link>
              <Link to="/about"><a href="/"><FiInfo className="movepicon"/> About</a></Link>
              <Link to="/Profile"><a href="/"><CgProfile className="movepicon"/> Profile</a> </Link> 
              <Link to="/"><a href="/"><BiLogOutCircle  className="movepicon"/>Logout</a> </Link> 
              </div> 
            </nav>  
            <button className="nav-btn-category" onClick={showNavbar}>  
              <FaBars />  
            </button>
        </header>
        
        </div>  
       
    </div>
	);
}

export default Navbar_category;
