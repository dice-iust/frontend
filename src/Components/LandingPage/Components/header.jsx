import React from "react";  
import LogoImg from "../Assets/logo.png" 
import { Link } from "react-router-dom";  
import { IoHome } from "react-icons/io5"; // Import home icon  
import './landing.scss'; // Ensure you import the correct stylesheet  

const Navbar = () => {  
  return (  
    <header>
      <div class="container">
        <div class="logo">
            <img src={LogoImg} alt="Logo"></img>
            <h3>Trip Tide</h3>
        </div>
        <div class="links">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#" class="btn">Log In</a></li>
            <li><a href="#" class="btn">Sign Up</a></li>
          </ul>
        </div>
      </div>
    </header>
   
  );  
};  

export default Navbar;