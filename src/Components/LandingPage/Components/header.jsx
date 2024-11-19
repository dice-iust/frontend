import React, { useEffect, useState } from "react";
import LogoImg from "../Assets/logo.png" 
import { Link } from "react-router-dom";  
import { IoHome } from "react-icons/io5"; // Import home icon  
import './landing.scss'; // Ensure you import the correct stylesheet  
import axios from "axios";

const Navbar = () => {  
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

  if (loading) return <div>Loading...</div>;  
  if (error) return <div>Error: {error.message}</div>;  
  return (  
    <header>
      <div class="container">
        <div class="logo">
            <img src={LogoImg||data.logo_image_url} alt="Logo"></img>
            <h3>{data.logo_name}</h3>
        </div>
        <div class="links">
          <ul>
            <li><a href="#">{data.home}</a></li>
            <li><a href="#">{data.about}</a></li>
            <li><a href="/login" class="btn">{data.login_button}</a></li>
            <li><a href="/signup" class="btn">{data.signup_button}</a></li>
          </ul>
        </div>
      </div>
    </header>
   
  );  
};  

export default Navbar;