import React from "react";  
import BusImg from "../Assets/bus.png";  
import Navbar from "./header";   
import { FiArrowRight } from "react-icons/fi";  
import "./landing.scss";


const Home = () => {  
  return (  
    <div class="big-wrapper">
      <Navbar />
      <div class="showcase-area">
        <div class="container">
          <div class="left">
            <p class="big-title">  
                <div class="big-title">Start Your</div>  
              <div> <h2 class="primary-heading">ADVENTURE</h2>  </div>
                <div class="big-title"> Today ! </div>   
            </p>
            <div class="cta"></div>
              <a href="#" class="btn2"> Let's Go<FiArrowRight /></a>  
          </div>
          <div class="right">
            <img src={BusImg} alt="Bus" class="person"></img>
          </div>
          </div>
      </div>
    </div>
  );  
};  

export default Home;