import React from "react";  
import { Link } from "react-router-dom";  
import { IoHome } from "react-icons/io5"; // Import home icon  
import './landing.scss'; // Ensure you import the correct stylesheet  

const Navbar = () => {  
  return (  
    <nav>  
      <div className="navbar-links-container">  
        <Link to="/" className="home-link">  
          <IoHome /> Home  
        </Link>  
        <div className="navbar-buttons">  
          <Link to="/login"> <button className="primary-button">Log in</button>  
          </Link>  
          <Link to="/signup"> <button className="primary-button">Sign Up</button>  
          </Link>  
        </div>  
      </div>  
    </nav>  
  );  
};  

export default Navbar;