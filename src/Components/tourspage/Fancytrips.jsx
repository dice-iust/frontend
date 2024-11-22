// import React from 'react'; 
import './Fancytrips.scss'; 
// import React, { useState } from 'react';  
// import { MdDateRange } from "react-icons/md";
import axios from "../../api/axios.js";  
import React, { useEffect, useState } from "react";  
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
import Travelsnav from "./Nav.jsx";
// import populartours from "./populartours.jsx";
import Footer from './footer.jsx';
import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosTimer } from "react-icons/io";

const FancylTravels_URL = 'travels/fancy/';
 


const Fancy = () => { 

  const [data, setData] = useState(null);  

    useEffect(() => {  
        const fetchData = async () => {  
            try {  
                const response = await axios.get(FancylTravels_URL);  
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
      
        <div className='fancy'>  
        <Travelsnav />  
        <div className="tour-list-container-fancy">  
            {data && data.Fancy_Trips ? (  
                <div className="tour-list-fancy">  
                    {data.Fancy_Trips.map((tour) => (  
                        <div key={tour.Id} className="tour-card-fancy">  
                            <div className="tour-image-container-fancy">  
                                <img  
                                    src={tour.image_url}  
                                    alt={`Image of ${tour.name}`}  
                                    className="tour-image-fancy"  
                                />  
                                {tour.admin && (  
                                    <div className="tour-admin-fancy">  
                                        <img  
                                            src={tour.admin.phrofile_image}   
                                            alt={`Profile of ${tour.admin.user_name}`}  
                                            className="admin-photo-fancy"  
                                        />  
                                        {tour.admin.user_name}   
                                    </div>  
                                )}  
                            </div>  
                            <div className="tour-info-fancy">  
                                <p className="tour-meta-fancy3">  
                                    <span className="tour-name-fancy">{tour.name}</span>  
                                    <div className={`trip-type-fancy ${tour.mode}`}>  
                                        <GrMoney aria-hidden="true" />{" "}  
                                        {tour.mode.charAt(0).toUpperCase() + tour.mode.slice(1)}  
                                    </div>  
                                </p>  
                                <div className="tour-details-fancy">  
                                    <p className="tour-route-fancy">  
                                        <span className="tour-text-fancy">{tour.start_place} {getTransportationIcon(tour.transportation)} {tour.destination}</span>  
                                    </p>  
                                </div>  
                                <div className="tour-meta-fancy7">  
                                    <p className="tour-dates-fancy">  
                                        <FaRegCalendar className='moveicon-fancy3' />  
                                        <span>{formatDate(tour.start_date)}</span>  
                                    </p>  
                                    <p className="tour-length-fancy" style={{ textAlign: "left" }}>  
                                        <FaUndoAlt className='moveicon-fancy3' />  
                                        {formatDate(tour.end_date)}  
                                    </p>  
                                </div>   
                            </div>  
                        </div>  
                    ))}  
                </div>  
            ) : (  
                <p>Loading Fancy trips...</p>  
            )}    
        </div>   
        <br />   
        <Footer />  
    </div>  
  );  
  };  
export default Fancy;
    


