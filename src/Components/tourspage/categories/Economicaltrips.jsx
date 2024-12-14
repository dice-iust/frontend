// import React from 'react'; 
import './Economicaltrips.scss'; 
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
import Footer from '../footer.jsx';
import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosTimer } from "react-icons/io";
import Travelsnav from "../categories_nav.jsx";  
import { Link } from 'react-router-dom'; 


const EconomicalTravels_URL = 'travels/economy/';  
 


const Economical = () => { 

  const [data, setData] = useState(null);  

    useEffect(() => {  
        const fetchData = async () => {  
            try {  
                const response = await axios.get(EconomicalTravels_URL);  
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
        return <TbTrain className="moveicon-economical2" />;  
      case 'bus':  
        return <TbBus className="moveicon-economical2" />;  
      case 'plane':  
        return <FaPlane className="moveicon-economical2"/>;  
      case 'car':  
        return <FaCarSide className="moveicon-economical2" />;  
      default:  
        return null;  
    }  
  };
  
    const currentDate = new Date();  
    
    return (  
    <div className='app-container-economical'>
      <div className='economial'>  
      <Travelsnav />  
      <br/>
      <br/>
      <div className="tour-list-container-economical">  
          {data && data.economical_Trips ? (  
              <div className="tour-list-economical">  
                  {data.economical_Trips.map((tour) => (  
                      <Link to={`/TripsPage/${tour.name}`} className="tour-card-economical"> 
                          <div className="tour-image-container-economical">  
                              <img  
                                  src={tour.image_url}  
                                  alt={`Image of ${tour.name}`}  
                                  className="tour-image-economical"  
                              />  
                              {tour.admin && (  
                                  <div className="tour-admin-economical">  
                                      <img  
                                          src={tour.admin.phrofile_image}   
                                          alt={`Profile of ${tour.admin.user_name}`}  
                                          className="admin-photo-economical"  
                                      />  
                                      {tour.admin.user_name}   
                                  </div>  
                              )}  
                          </div>  
                          <div className="tour-info-economical">  
                              <p className="tour-meta-economical3">  
                                  <span className="tour-name-economical">{tour.name}</span>  
                                  <div className={`trip-type-economical ${tour.mode}`}>  
                                      <GrMoney aria-hidden="true" />{" "}  
                                      {tour.mode.charAt(0).toUpperCase() + tour.mode.slice(1)}  
                                  </div>  
                              </p>  
                              <div className="tour-details-economical">  
                                  <p className="tour-route-economical">  
                                      <span className="tour-text-economical">{tour.start_place} {getTransportationIcon(tour.transportation)} {tour.destination}</span>  
                                  </p>  
                              </div>  
                              <div className="tour-meta-economical7">  
                                  <p className="tour-dates-economical">  
                                      <FaRegCalendar className='moveicon-economical3' />  
                                      <span>{formatDate(tour.start_date)}</span>  
                                  </p>  
                                  <p className="tour-length-economical" style={{ textAlign: "left" }}>  
                                      <FaUndoAlt className='moveicon-economical3' />  
                                      {formatDate(tour.end_date)}  
                                  </p>  
                              </div>   
                          </div>  
                      </Link>  
                  ))}  
              </div>  
          ) : (  
              <p>Loading Economical trips...</p>  
          )}    
      </div> 
      </div>  
      <br/>
      <br/>  
      <Footer />  
  </div>  
);  
};  
export default Economical;
    


