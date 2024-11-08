import React from "react";  
import BannerImage from "../Assets/Pics_24-11-06_20-41-59-811.png";  
import Navbar from "./Navbar";  
import Footer from "./Footer";  
import { FiArrowRight } from "react-icons/fi";  
import "./landing.css";


const Home = () => {  
  return (  
    <div className="home-container">  
      <Navbar />  
      <div className="home-banner-container">  
        <div className="home-text-section">  
          <p className="primary-text">  
            <div className="primary-text">Start Your</div>  
           <div> <h2 className="primary-heading">ADVENTURE</h2>  </div>
            <div className="primary-text"> Today ! </div>   
          </p>  
          <div><button className="secondary-button">  
            Let's Go <FiArrowRight />  
          </button></div>  
        </div>  
        <div className="home-image-section">  
          <img src={BannerImage} alt="Adventure Banner" />  
         
        </div>  
      </div>  
      <div class="line"></div>  
      <Footer />  
    </div>  
  );  
};  

export default Home;