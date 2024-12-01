import React, { useState, useEffect } from 'react';  
import "./ProfilePage.scss";  
import Travelsnav from "../tourspage/categories_nav.jsx";  
import Footer from '../tourspage/footer.jsx';  
import { useNavigate } from 'react-router-dom';  
import axios from '../../api/axios';  
import { IoAddCircleSharp } from "react-icons/io5";  
import EditProfile from '../EditProfile/EditProfile.jsx';  

const Profile = () => {  
  const [data, setData] = useState(null);  
  const [isEditing, setIsEditing] = useState(false);  
  const navigate = useNavigate();  

  const getFormData = async () => {  
    try {  
      const response = await axios.get("https://triptide.pythonanywhere.com/profile/", {  
        headers: { Authorization: localStorage.getItem("token") },  
      });  
      setData(response.data);  
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

  const handleEdit = () => {  
    setIsEditing(true);  
  };  

  const handleSave = (updatedData) => {  
    setData(updatedData);  
    setIsEditing(false);  
  };  

  const handleCancel = () => {  
    setIsEditing(false);  
  };  

  return (  
    <div className='ProfilePage'>  
      <Travelsnav />  
      <div className='profile-page'>  
        <nav className="menu" tabIndex="0">  
          <div className="smartphone-menu-trigger"></div>  
          <header className="avatar">  
            {data && data.profilePicture && (  
              <img  
                src={data.profilePicture}  
                alt="Profilepic"  
                className="avatar-image"  
              />  
            )}  
            <h2>{data ? data.firstName : ''}</h2>  
            <p>{data ? data.bio : ''}</p>  
          </header>  
          <ul>  
            <li tabIndex="0" className="icon-dashboard"><span>My trips</span></li>  
            <li tabIndex="0" className="icon-customers"><span>My rate</span></li>  
            <li tabIndex="0" className="icon-users"><IoAddCircleSharp className='icon' /><span>Create new trip</span></li>  
            <li tabIndex="0" className="icon-settings"><span onClick={handleEdit}>Edit profile</span></li> {/* Updated to open edit profile */}  
          </ul>  
        </nav>  
        <main className="content">  
          {!isEditing ? (  
            <div className="helper">  
              <h1>Profile Overview</h1>  
              <p>RESIZE THE WINDOW</p>  
              <span>Breakpoints at 900px and 400px</span>  
            </div>  
          ) : (  
            <EditProfile data={data} onSave={handleSave} onCancel={handleCancel} /> 
          )}  
        </main>  
      </div>  
      <Footer />  
    </div>  
  );  
};  

export default Profile;