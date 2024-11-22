 
import { FiArrowRight } from "react-icons/fi";  
import "./landing.scss";
import axios  from "axios";
import React, { useEffect, useState } from "react";
import LogoImg from "../Assets/logo.png" 
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();  
  const [data, setData] = useState(null);   
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);   
  const handleLogin = () => {
    navigate('/login')
    };

  const handleSignup = () => {
        navigate('/signup')
    };
    const handleabout = () => {
      navigate('/about')
  };
    const handleHome = () => {
      if(data.isauthenticated==true)
      {
        navigate("/Main")
      }
      else
      {
        navigate("/login")
      }
  };
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
            <img src={data.logo_image_url} alt="Logo"></img>
            <h3>{data.logo_name}</h3>
        </div>
        <button class="hamburger" aria-expanded="false">  
                    <span class="line"></span>  
                    <span class="line"></span>  
                    <span class="line"></span>  
                </button>  
        <div class="links">
          <ul>
            <li><a href="" onClick={handleHome}>{data.home}</a></li>
            <li><a href="" onClick={handleabout} >{data.about}</a></li>
            <li><a  href="" onClick={handleSignup}>{data.signup_button}</a></li>
            <li><a href="" onClick={handleLogin}>{data.login_button}</a></li>
          </ul>
        </div>
        </nav>
      </header>    
      <div class="content-center"> 
      <h1 class="title">
      {data.text}
       </h1> 
        <a href="" class="btn2" onClick={handleSignup}>{data.paginate}<FiArrowRight /></a> 
      </div>
      </div>
    </div>
  );  
};  

export default Home;