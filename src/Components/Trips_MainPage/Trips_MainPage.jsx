// import React from 'react';  
import './Trips_MainPage.scss';  
import { GiCash } from "react-icons/gi";
import { BsFillChatFill } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { TbHomeFilled } from "react-icons/tb";
import React, { useEffect, useState } from 'react';  
import axios  from "../../api/axios.js";
import { useParams } from 'react-router-dom';  

const Trips_MainPage = () => {   
    const user = {  
        profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s',  
        name: 'John Doe',  
        role: 'admin'   
    };  
    const user1 = {  
        profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s',  
        name: 'John Doe',  
        role: 'member'   
    };  

    
    const { tourname } = useParams();
    const isAdmin = user?.role === 'admin';   

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
                <h1>Welcome to the Trips Page {tourname}!</h1>  
            </div>  
        </div>  
    );  
};  

export default Trips_MainPage;
