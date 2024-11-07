import React from "react";
import BannerImage from "../Assets/Picsart_24-11-06_20-41-59-811.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
      
        <div className="home-text-section">
        <p className="primary-text">
        <p className="primary-TEXT">
            Start Your
          </p> 
          <h2 className="primary-heading">
            ADVENTURE 
          </h2>
          <p className="primary-Text">
            Today!
          </p> 
          </p>
          <button className="secondary-button">
            Let's Go<FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;

