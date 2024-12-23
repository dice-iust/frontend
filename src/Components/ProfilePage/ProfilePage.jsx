import React, { useState, useEffect } from 'react';  
import "./ProfilePage.scss";  
import Travelsnav from "./header.jsx";  
import Footer from '../tourspage/footer.jsx';  
import axios from '../../api/axios';  
import { IoAddCircleSharp } from "react-icons/io5";  
import EditProfile from '../EditProfile/EditProfile.jsx';  
import AddNewTrip from '../AddNewTrip/AddNewTrip.jsx';  
import MyTrips from './MyTrips/MyTrips.jsx';   
import MyRate from './MyRate/MyRate.jsx';  
import { BsFillSuitcaseFill } from "react-icons/bs";  
import { RxStarFilled } from "react-icons/rx";  
import { FaEdit } from "react-icons/fa";  
import { useNavigate, useLocation } from 'react-router-dom';   

const Profile = () => {   
  const location = useLocation();  
  const navigate = useNavigate();  
  const [data, setData] = useState(null);  
  const [isEditing, setIsEditing] = useState(false);  
  const [showMyTrips, setShowMyTrips] = useState(() => {  
    if (location.state && location.state.showMyTrips !== undefined) {  
      return location.state.showMyTrips;  
    }  
    return true; 
  });    
  const [showAddTrip, setShowAddTrip] = useState(location.state?.showAddTrip || false);  
  const [showRate, setShowRate] = useState(false);   

  const getFormData = async () => {  
    try {  
      const response = await axios.get("https://triptide.liara.run/profile/", {  
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
  }, [navigate]); // Added navigate to dependency array  

  const handleEdit = () => {  
    setIsEditing(true);  
    setShowMyTrips(false);  
    setShowAddTrip(false);    
    setShowRate(false);  // This was corrected to ensure all states are reset correctly  
  };  

  const handleSave = (updatedData) => {  
    setData(updatedData);  
    setIsEditing(false);  
    setShowAddTrip(false);   
    setShowRate(false);  
  };  

  const handleCancel = () => {  
    setIsEditing(false);   
    setShowMyTrips(true);   
    setShowAddTrip(false);  
    setShowRate(false);  
  };  

  const handleMyTrips = () => {  
    setShowMyTrips(true);   
    setIsEditing(false);   
    setShowAddTrip(false);  
    setShowRate(false);  
  };  

  const handleAddTrips = () => {  
    setShowMyTrips(false);   
    setIsEditing(false);  
    setShowAddTrip(true);  
    setShowRate(false);  
  };  

  const handleMyRate = () => {  
    setShowRate(true);   
    setIsEditing(false);  
    setShowMyTrips(false);  
    setShowAddTrip(false);  
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
                alt="Profile picture"  
                className="avatar-image"  
              />  
            )}  
            <h2>{data ? data.user_name : ''}</h2>  
            <p>{data ? data.bio : ''}</p>  
          </header>  
          <ul>  
            <li   
              tabIndex="0"   
              className={`icon-settings ${showMyTrips ? 'active' : ''}`}   
              onClick={handleMyTrips}  
            >   
              <span><BsFillSuitcaseFill className='iconmove'/> My trips</span>  
            </li>  
            <li   
              tabIndex="0"   
              className={`icon-settings ${showRate ? 'active' : ''}`}   
              onClick={handleMyRate}   
            >  
              <span><RxStarFilled className='iconmove'/> My rate</span>  
            </li>  
            <li   
              tabIndex="0"   
              className={`icon-settings ${showAddTrip ? 'active' : ''}`}   
              onClick={handleAddTrips}  
            >  
              <span><IoAddCircleSharp className='iconmove' /> Create new trip</span>  
            </li>  
            <li   
              tabIndex="0"   
              className={`icon-settings ${isEditing ? 'active' : ''}`}   
              onClick={handleEdit}  
            >  
              <FaEdit className='iconmove' /> Edit profile  
            </li>  
          </ul>  
        </nav>   

        <main className="content">  
          {showMyTrips ? (  
            <MyTrips data={data} onCancel={handleCancel} />   
          ) : isEditing ? (  
            <EditProfile data={data} onSave={handleSave} onCancel={handleCancel} />   
          ) : showAddTrip ? (  
            <AddNewTrip data={data} onCancel={handleCancel} />   
          ) : showRate ? (  
            <MyRate data={data} onCancel={handleCancel} />   
          ) : (  
            <div className="helper">  
              <h1>Profile Overview</h1>  
              <p>RESIZE THE WINDOW</p>  
              <span>Breakpoints at 900px and 400px</span>  
            </div>  
          )}   
        </main>  
      </div>  
      <Footer />  
    </div>  
  );  
};  

export default Profile;