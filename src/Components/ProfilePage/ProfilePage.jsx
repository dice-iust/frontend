import React from 'react';  
import "./ProfilePage.scss";  
import Travelsnav from "../tourspage/categories_nav.jsx";  
import Footer from '../tourspage/footer.jsx';  
import { useState, useEffect, useRef, useContext } from 'react';  
import { Link, useNavigate } from 'react-router-dom';  
import axios from '../../api/axios';  


const Profile = () => {  

  const [data, setData] = useState(null);
  const navigate = useNavigate();  
  const getFormData = async () => {  
    try {  
      const response = await axios.get("https://triptide.pythonanywhere.com/profile/", {  
        headers: { Authorization: localStorage.getItem("token") },  
      }); 
      setData(response.data) ;
    } catch (error) {  
      console.error("Error fetching data:", error);  
    }  
  };  

  useEffect(() => {  
    const token = localStorage.getItem("token");  
    if (!token) {  
      navigate("/login");  
    } else {  
      getFormData();  
    }  
  }, []);  


  return (  
    <div className='ProfilePage'>  
      <Travelsnav/>      
      <div className='profile-page'>  
        <nav className="menu" tabIndex="0">  
          <div className="smartphone-menu-trigger"></div>  
          <header className="avatar">  
          {data && data.profilePicture && (  
            <img   
              src={data.profilePicture}
              alt="Profile of John D."   
              className="avatar-image"   
            />  
          )}
            <h2>{data.firstName}</h2>  
            <p>{data.bio}</p>
          </header>  
          <ul>  
            <li tabIndex="0" className="icon-dashboard"><span>My trips</span></li>  
            <li tabIndex="0" className="icon-customers"><span>My rate</span></li>  
            <li tabIndex="0" className="icon-users"><span>Create new trip</span></li>  
            <li tabIndex="0" className="icon-settings"><span>Edit profile</span></li>  
          </ul>  
        </nav>  
        <main className="content">  
          <div className="helper">  
            <h1>Profile Overview</h1>  
            <p>RESIZE THE WINDOW</p>  
            <span>Breakpoints at 900px and 400px</span>  
          </div>  
        </main>  
      </div>  
      <Footer/>  
    </div>  
  );  
};  

export default Profile;