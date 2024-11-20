 
import BusImg from "../Assets/bus.png";  

import { FiArrowRight } from "react-icons/fi";  
import "./landing.css";
import axios  from "axios";
import React, { useEffect, useState } from "react";
import LogoImg from "../Assets/logo.png" 

const Home = () => {
  const [data, setData] = useState(null);   
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);   

  useEffect(() => {  
    const fetchData = async () => {  
      try {  
        const response = await axios.get("https://TripTide.pythonanywhere.com/home/"); // Replace with your actual endpoint  
        setData(response.data);  
        } catch (err) {  
        setError(err);   
      } finally {  
        setLoading(false); 
      }  
    };  

    fetchData();   
  }, []);   

  if (loading) return <div>Loading...</div>;  // Show loading state  
  if (error) return <div>Error: {error.message}</div>;  // Show error message if any   
  return (
    <div class="LandingForm">  
      <div class="land-back">
      <header>
        <nav class="container">
        <div class="logo">
            <img src={LogoImg||data.logo_image_url} alt="Logo"></img>
            <h3>{data.logo_name}</h3>
        </div>
        <div class="links">
          <ul>
            <li><a href="#">{data.home}</a></li>
            <li><a href="#">{data.about}</a></li>
            <li><a href="/signup">Signup</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>
        </nav>
      </header>    
      <div class="content-center"> 
      <h1 class="title">
      Start Your Adventure !
        {/* <div class="aurora">
          <div class="aurora__item"></div>
          <div class="aurora__item"></div>
          <div class="aurora__item"></div>
          <div class="aurora__item"></div>
        </div> */}
       </h1> 
        <a href="#" class="btn2">Let's Go<FiArrowRight /></a> 

      </div>
      {/* <div class="showcase-area">
        <div class="container">
          <div class="left">
            <p class="big-title">  
                <div class="big-title">Start Your Adventure Today</div>   
            </p>
            <div class="cta"></div>
              <a href="#" class="btn2">{data.paginate}<FiArrowRight /></a>  
          </div>
          {/* <div class="right">
            <img src={ BusImg||data.image_url } alt="Bus" class="person"></img>
          </div> */}
          {/* </div> */}
      {/* </div> */} 
      </div>
    </div>
  );  
};  

export default Home;