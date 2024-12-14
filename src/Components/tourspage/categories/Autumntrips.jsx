// import React from 'react'; 
import './Autumntrips.scss'; 
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


const AutumnTravels_URL = 'travels/autumn';  
 


const Autumn = () => { 
    
  const [data, setData] = useState(null);  

    useEffect(() => {  
        const fetchData = async () => {  
            try {  
                const response = await axios.get(AutumnTravels_URL);  
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
        return <TbTrain className="moveicon-autumn" />;  
      case 'bus':  
        return <TbBus className="moveicon-autumn"/>;  
      case 'plane':  
        return <FaPlane className="moveicon-autumn" />;  
      case 'car':  
        return <FaCarSide className="moveicon-autumn" />;  
      default:  
        return null;  
    }  
  };
  
    const currentDate = new Date();  
    
    return (  
    <div className='app-container-autumn'>
      <div className='autumn'>  
      <Travelsnav />  
     
      <br/>
      <div className="tour-list-container-autumn">  
          {data && data.Autumn_Trips ? (  
              <div className="tour-list-autumn">  
                  {data.Autumn_Trips.map((tour) => (  
                      <Link to={`/TripsPage/${tour.name}`} className="tour-card-autumn"> 
                          <div className="tour-image-container-autumn">  
                              <img  
                                  src={tour.image_url}  
                                  alt={`Image of ${tour.name}`}  
                                  className="tour-image-autumn"  
                              />  
                              {tour.admin && (  
                                  <div className="tour-admin-autumn">  
                                      <img  
                                          src={tour.admin.phrofile_image}   
                                          alt={`Profile of ${tour.admin.user_name}`}  
                                          className="admin-photo-autumn"  
                                      />  
                                      {tour.admin.user_name}   
                                  </div>  
                              )}  
                          </div>  
                          <div className="tour-info-autumn">  
                              <p className="tour-meta-autumn3">  
                                  <span className="tour-name-autumn">{tour.name}</span>  
                                  <div className={`trip-type-autumn ${tour.mode}`}>  
                                      <GrMoney aria-hidden="true" />{" "}  
                                      {tour.mode.charAt(0).toUpperCase() + tour.mode.slice(1)}  
                                  </div>  
                              </p>  
                              <div className="tour-details-autumn">  
                                  <p className="tour-route-autumn">  
                                      <span className="tour-text-autumn">{tour.start_place} {getTransportationIcon(tour.transportation)} {tour.destination}</span>  
                                  </p>  
                              </div>  
                              <div className="tour-meta-autumn7">  
                                  <p className="tour-dates-autumn">  
                                      <FaRegCalendar className='moveicon-autumn3' />  
                                      <span>{formatDate(tour.start_date)}</span>  
                                  </p>  
                                  <p className="tour-length-autumn" style={{ textAlign: "left" }}>  
                                      <FaUndoAlt className='moveicon-autumn3' />  
                                      {formatDate(tour.end_date)}  
                                  </p>  
                              </div>   
                          </div>  
                      </Link>  
                  ))}  
              </div>  
          ) : (  
              <p>Loading Autumn trips...</p>  
          )}    
      </div>  
      </div> 
      
      <br/>
      <Footer />  
  </div>  
  );  
};  
export default Autumn;
    


