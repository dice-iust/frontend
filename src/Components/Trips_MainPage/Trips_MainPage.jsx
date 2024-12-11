import React from 'react';  
import './Trips_MainPage.scss';  

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

    const isAdmin = user?.role === 'admin';   

    return (  
        <div className="main-page">  
            <div className="sidebar">  
                <ul className="menu">  
                    <li className="menu-item">Main</li>  
                    {isAdmin && <li className="menu-item">Requests</li>}   
                    <li className="menu-item">Q&A</li>  
                    <li className="menu-item">Planner</li>  
                </ul>  
                <div className="profile">  
                    <img src={user.profilePicture} alt="Profile" className="profile-pic" />  
                    <span className="profile-name">{user.name}</span>  
                </div>  
            </div>  
            <div className="content">  
                <h1>Welcome to the Trips Page!</h1>  
            </div>  
        </div>  
    );  
};  

export default Trips_MainPage;
