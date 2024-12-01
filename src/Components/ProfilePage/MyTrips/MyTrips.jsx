// import React from 'react'; 
import './MyTrips.scss'; 
// import React, { useState } from 'react';  
import axios from "../../../api/axios.js";  
import React, { useEffect, useState } from "react"; 
// import { MdDateRange } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { FaCarSide } from "react-icons/fa6";
import { FaPlane } from "react-icons/fa";
import { TbTrain } from "react-icons/tb";
import { TbBus } from "react-icons/tb";
import { FaUndoAlt } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";   
import "slick-carousel/slick/slick-theme.css";  
import Slider from "react-slick"; 
// import Travelsnav from "../Nav.jsx";
// import populartours from "./populartours.jsx";




 


const MyTrips = () => { 
    const tours = [  
        {  
          Id: 1,  
          name: "City Trip1",  
          start_date: "2023-03-15",  
          image_url: "https://plus.unsplash.com/premium_photo-1697729905164-f61ad5207758?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVocmFufGVufDB8fDB8fHww",
          destination: "Tehran",  
          admin: { user_name: "Admin5", phrofile_image: "https://clipart-library.com/2023/Admin-Profile-Vector-PNG-Clipart.png" }, 
          mode : "Budget-Friendly" , 
          start_place : "Isfahan",
          transportation : "Car",
         end_date : "2023-11-27",
        }
    ]

    const formatDate = (dateString) => {  
        const [year, month, day] = dateString.split('-');  
        return `${year}/${month}/${day}`;  
      };  

  const getTransportationIcon = (transportation) => {  
    switch (transportation.toLowerCase()) {  
      case 'train':  
        return <TbTrain className="moveicon-mytrips" />;  
      case 'bus':  
        return <TbBus className="moveicon-mytrips"/>;  
      case 'plane':  
        return <FaPlane className="moveicon-mytrips" />;  
      case 'car':  
        return <FaCarSide className="moveicon-mytrips" />;  
      default:  
        return null;  
    }  
  };
  
    const currentDate = new Date();  
    
    return (  
    <div className='app-container-mytrips'>
      <div className='mytrips'>  
      
     
      <br/>
      <div className="tour-list-container-mytrips">  
           
              <div className="tour-list-mytrips">  
                  {tours.map((tour) => (  
                      <div key={tour.Id} className="tour-card-mytrips">  
                          <div className="tour-image-container-mytrips">  
                              <img  
                                  src={tour.image_url}  
                                  alt={`Image of ${tour.name}`}  
                                  className="tour-image-mytrips"  
                              />  
                              {tour.admin && (  
                                  <div className="tour-admin-mytrips">  
                                      <img  
                                          src={tour.admin.phrofile_image}   
                                          alt={`Profile of ${tour.admin.user_name}`}  
                                          className="admin-photo-mytrips"  
                                      />  
                                      {tour.admin.user_name}   
                                  </div>  
                              )}  
                          </div>  
                          <div className="tour-info-mytrips">  
                              <p className="tour-meta-mytrips3">  
                                  <span className="tour-name-mytrips">{tour.name}</span>  
                                  <div className={`trip-type-mytrips ${tour.mode}`}>  
                                      <GrMoney aria-hidden="true" />{" "}  
                                      {tour.mode.charAt(0).toUpperCase() + tour.mode.slice(1)}  
                                  </div>  
                              </p>  
                              <div className="tour-details-mytrips">  
                                  <p className="tour-route-mytrips">  
                                      <span className="tour-text-mytrips">{tour.start_place} {getTransportationIcon(tour.transportation)} {tour.destination}</span>  
                                  </p>  
                              </div>  
                              <div className="tour-meta-mytrips7">  
                                  <p className="tour-dates-mytrips">  
                                      <FaRegCalendar className='moveicon-mytrips3' />  
                                      <span>{formatDate(tour.start_date)}</span>  
                                  </p>  
                                  <p className="tour-length-mytrips" style={{ textAlign: "left" }}>  
                                      <FaUndoAlt className='moveicon-mytrips3' />  
                                      {formatDate(tour.end_date)}  
                                  </p>  
                              </div>   
                          </div>  
                      </div>  
                  ))}  
              </div>  
          
      </div>  
      </div> 
      
      <br/>
     
  </div>  
  );  
};  
export default MyTrips;
    


