 
import BusImg from "../Assets/bus.png";  
import Navbar from "./header";   
import { FiArrowRight } from "react-icons/fi";  
import "./landing.scss";
import axios  from "axios";
import React, { useEffect, useState } from "react";


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
    <div class="big-wrapper">
      <Navbar />
      <div class="showcase-area">
        <div class="container">
          <div class="left">
            <p class="big-title">  
                <div class="big-title">{data.text}</div>  
              <div> <h2 class="primary-heading">{data.text3}</h2>  </div>
                <div class="big-title"> {data.text4} </div>   
            </p>
            <div class="cta"></div>
              <a href="#" class="btn2">{data.paginate}<FiArrowRight /></a>  
          </div>
          <div class="right">
            <img src={ BusImg||data.image_url } alt="Bus" class="person"></img>
          </div>
          </div>
      </div>
    </div>
    </div>
  );  
};  

export default Home;