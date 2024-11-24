import React, { useRef } from "react";  
import { FaBars, FaTimes } from "react-icons/fa";  
import "./categories_nav.scss";  
import LogoImg from "../tourspage/Assests/logo.png";
import { Link } from 'react-router-dom';   

function Navbar_Category() {  
  const navref_category = useRef();  

  const showNavbar_Category = () => {  
    navref_category.current.classList.toggle("responsive_nav-category");  
  };  

  return (  
    <div className="nav-page-category">  
      <header>  
        <div className="logo-category">   
            <a href="./"><img src={LogoImg} alt="Logo"/></a>  
            <h3 className="trip-title-category">Trip Tide</h3>  
        </div>  
        <nav ref={navref_category}>  
          <button   
            className="nav-category-btn nav-category-close-btn"   
            onClick={showNavbar_Category}   
            aria-label="Close Navigation"  
          >  
            <FaTimes />  
          </button>  
          <Link to="/about"><span>About</span></Link>  
          <Link to="/EditProfile"><span>Profile</span></Link>   
        </nav>  
        <button   
          className="nav-btn-category"   
          onClick={showNavbar_Category}   
          aria-label="Open Navigation"  
        >  
          <FaBars />  
        </button>  
      </header>  
    </div>  
  );  
}  

export default Navbar_Category;