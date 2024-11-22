// import React from 'react'; 
import './Wintertrips.scss'; 
import axios from "../../api/axios.js";  
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
import Travelsnav from "./Nav.jsx";
// import populartours from "./populartours.jsx";
import Footer from './footer.jsx';
import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosTimer } from "react-icons/io";


 
const winter_URL = 'travels/winter/'; 

const Winter = () => { 
    
  const [data, setData] = useState(null);   
  useEffect(() => {  
    const fetchData = async () => {  
        try {  
            const response = await axios.get(winter_URL);  
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
      <div className='winter'>  
      <Travelsnav />  
      <div className="tour-list-container-winter">  
          {data && data.Winter_Trips ? (  
              <div className="tour-list-winter">  
                  {data.Winter_Trips.map((tour) => (  
                      <div key={tour.Id} className="tour-card-winter">  
                          <div className="tour-image-container-winter">  
                              <img  
                                  src={tour.image_url}  
                                  alt={`Image of ${tour.name}`}  
                                  className="tour-image-winter"  
                              />  
                              {tour.admin && (  
                                  <div className="tour-admin-winter">  
                                      <img  
                                          src={tour.admin.phrofile_image}   
                                          alt={`Profile of ${tour.admin.user_name}`}  
                                          className="admin-photo-winter"  
                                      />  
                                      {tour.admin.user_name}   
                                  </div>  
                              )}  
                          </div>  
                          <div className="tour-info-winter">  
                              <p className="tour-meta-winter3">  
                                  <span className="tour-name-winter">{tour.name}</span>  
                                  <div className={`trip-type-winter ${tour.mode}`}>  
                                      <GrMoney aria-hidden="true" />{" "}  
                                      {tour.mode.charAt(0).toUpperCase() + tour.mode.slice(1)}  
                                  </div>  
                              </p>  
                              <div className="tour-details-winter">  
                                  <p className="tour-route-winter">  
                                      <span className="tour-text-winter">{tour.start_place} {getTransportationIcon(tour.transportation)} {tour.destination}</span>  
                                  </p>  
                              </div>  
                              <div className="tour-meta-winter7">  
                                  <p className="tour-dates-winter">  
                                      <FaRegCalendar className='moveicon-winter3' />  
                                      <span>{formatDate(tour.start_date)}</span>  
                                  </p>  
                                  <p className="tour-length-winter" style={{ textAlign: "left" }}>  
                                      <FaUndoAlt className='moveicon-winter3' />  
                                      {formatDate(tour.end_date)}  
                                  </p>  
                              </div>   
                          </div>  
                      </div>  
                  ))}  
              </div>  
          ) : (  
              <p>Loading winter trips...</p>  
          )}    
      </div>   
      <br />   
      <Footer />  
    </div>  
    );  
    }; 
export default Winter;
    


