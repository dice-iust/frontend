import React, { useEffect, useState } from 'react';  
import './Trips_MainPage.scss';  
import { GiCash } from "react-icons/gi";  
import { BsFillChatFill } from "react-icons/bs";  
import { IoMdPersonAdd } from "react-icons/io";  
import { TbHomeFilled } from "react-icons/tb";  
import axios from "../../api/axios.js";  // Import your Axios instance  
import { useParams } from 'react-router-dom';  

const Trips_MainPage = () => {   
    const user = {  
        profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s',  
        name: 'John Doe',  
        role: 'admin'   
    };  
   
    const { tourname } = useParams();  
    const isAdmin = user?.role === 'admin';   
    
    const [tripData, setTripData] = useState(null);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    useEffect(() => {  
        const fetchTripData = async () => {  
            try {  
                const response = await axios.get(`https://triptide.pythonanywhere.com/travels/travelname/`, {  
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    }
                });  
                setTripData(response.data);   
            } catch (err) {  
                setError(err.response.data.detail || 'An error occurred while fetching trip data.');  
            } finally {  
                setLoading(false);  
            }  
        };  

        fetchTripData();  
    }, [tourname]);  

    return (  
        <div className="main-page">  
            <div className="sidebar">  
                <ul className="menu">  
                    <li className="menu-item">  
                        <TbHomeFilled size={25} className='moveiconMain'/>  
                        Main  
                    </li>  
                    {isAdmin && <li className="menu-item"><IoMdPersonAdd size={25} className='moveiconadd'/> Requests</li>}   
                    <li className="menu-item"><BsFillChatFill size={22} className='moveiconchat'/> Q&A</li>  
                    <li className="menu-item"><GiCash size={25}/> Planner</li>  
                </ul>  
                <div className="profile">  
                    <img src={user.profilePicture} alt="Profile" className="profile-pic" />  
                    <span className="profile-name">{user.name}</span>  
                </div>  
            </div>  
            <div className="content">  
                {loading && <p>Loading trip information...</p>}  
                {error && <p className="error">{error}</p>}  
                {tripData && (  
                    <div>  
                        <h1>Welcome to the Trips Page {tripData.name}!</h1>  
                        <p>{tripData.description}</p> {/* assuming tripData contains a description field */}  
                        {/* Render more trip details as needed */}  
                    </div>  
                )}  
                {!loading && !error && !tripData && <p>No trip found.</p>}  
            </div>  
        </div>  
    );  
};  

export default Trips_MainPage;