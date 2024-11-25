// import React from 'react'; 
import './Summertrips.scss'; 
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
import Travelsnav from "../categories_nav.jsx";  
// import populartours from "./populartours.jsx";
import Footer from '../footer.jsx';
// import { FaArrowRight } from "react-icons/fa";
// import { IoIosArrowBack } from "react-icons/io";
import { IoIosTimer } from "react-icons/io";


 
const SummerTravels_URL = 'travels/summer/';  

const Summer = () => { 

  const [data, setData] = useState(null);  

    useEffect(() => {  
        const fetchData = async () => {  
            try {  
                const response = await axios.get(SummerTravels_URL);  
                setData(response.data);  
                console.log(response.data);  
            } catch (error) {  
                console.error("Error fetching data:", error);  
            }  
        };  
        fetchData();  
    }, []);  

  const formatDate = (dateString) => {  
    const [year, month, day] = dateString.split('-');  
    return `${year}/${month}/${day}`;  
  };  

  

  const getTransportationIcon = (transportation) => {  
    switch (transportation.toLowerCase()) {  
      case 'train':  
        return <TbTrain style={{ marginRight: '1.5px' }} />;  
      case 'bus':  
        return <TbBus style={{ marginRight: '1.5px' }} />;  
      case 'plane':  
        return <FaPlane style={{ marginRight: '1.5px' }} />;  
      case 'car':  
        return <FaCarSide style={{ marginRight: '1.5px' }} />;  
      default:  
        return null;  
    }  
  };
  
    const currentDate = new Date();  
    
    return (  
        <div className='app-container-summer'>  
      
      <div className='summer'>  
          <Travelsnav />  
          <br/>
          <br/>
          <div className="tour-list-container-summer">  
              {data && data.Summer_Trips? (  
                  <div className="tour-list-summer">  
                      {data.Summer_Trips.map((tour) => (  
                          <div key={tour.Id} className="tour-card-summer">  
                              <div className="tour-image-container-summer">  
                                  <img  
                                      src={tour.image_url}  
                                      alt={`Image of ${tour.name}`}  
                                      className="tour-image-summer"  
                                  />  
                                  {tour.admin && (  
                                      <div className="tour-admin-summer">  
                                          <img  
                                              src={tour.admin.phrofile_image}   
                                              alt={`Profile of ${tour.admin.user_name}`}  
                                              className="admin-photo-summer"  
                                          />  
                                          {tour.admin.user_name}   
                                      </div>  
                                  )}  
                              </div>  
                              <div className="tour-info-summer">  
                                  <p className="tour-meta-summer3">  
                                      <span className="tour-name-summer">{tour.name}</span>  
                                      <div className={`trip-type-summer ${tour.mode}`}>  
                                          <GrMoney aria-hidden="true" />{" "}  
                                          {tour.mode.charAt(0).toUpperCase() + tour.mode.slice(1)}  
                                      </div>  
                                  </p>  
                                  <div className="tour-details-summer">  
                                      <p className="tour-route-summer">  
                                          <span className="tour-text-summer">{tour.start_place} {getTransportationIcon(tour.transportation)} {tour.destination}</span>  
                                      </p>  
                                  </div>  
                                  <div className="tour-meta-summer7">  
                                      <p className="tour-dates-summer">  
                                          <FaRegCalendar className='moveicon-summer3' />  
                                          <span>{formatDate(tour.start_date)}</span>  
                                      </p>  
                                      <p className="tour-length-summer" style={{ textAlign: "left" }}>  
                                          <FaUndoAlt className='moveicon-summer3' />  
                                          {formatDate(tour.end_date)}  
                                      </p>  
                                  </div>   
                              </div>  
                          </div>  
                      ))}  
                  </div>  
              ) : (  
                  <p>Loading Summer trips...</p>  
              )}    
          </div>   
          <br/>
          <br/> 
          </div>
          <Footer />  
      </div>  
  );  
};  
export default Summer;
    


