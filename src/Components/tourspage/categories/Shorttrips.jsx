// import React from 'react'; 
import './Shorttrips.scss'; 
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


 
const ShortTravels_URL = 'travels/short/'; 

const Short = () => { 
  const [data, setData] = useState(null);   
  useEffect(() => {  
    const fetchData = async () => {  
        try {  
            const response = await axios.get(ShortTravels_URL);  
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
        return <TbTrain className="moveicon-short2" />;  
      case 'bus':  
        return <TbBus className="moveicon-short2" />;  
      case 'plane':  
        return <FaPlane className="moveicon-short2" />;  
      case 'car':  
        return <FaCarSide className="moveicon-short2" />;  
      default:  
        return null;  
    }  
  };
  
    const currentDate = new Date();  
    
    return (  
        <div className='app-container-short'>
      <div className='shorttrips'>  
      <Travelsnav />  
      <br/>
      
      <div className="tour-list-container-short">  
          {data && data.Short_Trips ? (  
              <div className="tour-list-short">  
                  {data.Short_Trips.map((tour) => (  
                      <div key={tour.Id} className="tour-card-short">  
                          <div className="tour-image-container-short">  
                              <img  
                                  src={tour.image_url}  
                                  alt={`Image of ${tour.name}`}  
                                  className="tour-image-short"  
                              />  
                              {tour.admin && (  
                                  <div className="tour-admin-short">  
                                      <img  
                                          src={tour.admin.phrofile_image}   
                                          alt={`Profile of ${tour.admin.user_name}`}  
                                          className="admin-photo-short"  
                                      />  
                                      {tour.admin.user_name}   
                                  </div>  
                              )}  
                          </div>  
                          <div className="tour-info-short">  
                              <p className="tour-meta-short3">  
                                  <span className="tour-name-short">{tour.name}</span>  
                                  <div className={`trip-type-short ${tour.mode}`}>  
                                      <GrMoney aria-hidden="true" />{" "}  
                                      {tour.mode.charAt(0).toUpperCase() + tour.mode.slice(1)}  
                                  </div>  
                              </p>  
                              <div className="tour-details-short">  
                                  <p className="tour-route-short">  
                                      <span className="tour-text-short">{tour.start_place} {getTransportationIcon(tour.transportation)} {tour.destination}</span>  
                                  </p>  
                              </div>  
                              <div className="tour-meta-short7">  
                                  <p className="tour-dates-short">  
                                      <FaRegCalendar className='moveicon-short3' />  
                                      <span>{formatDate(tour.start_date)}</span>  
                                  </p>  
                                  <p className="tour-length-short" style={{ textAlign: "left" }}>  
                                      <FaUndoAlt className='moveicon-short3' />  
                                      {formatDate(tour.end_date)}  
                                  </p>  
                              </div>   
                          </div>  
                      </div>  
                  ))}  
              </div>  
          ) : (  
              <p>Loading short trips...</p>  
          )}    
      </div> 
      </div>  
      <br/> 
      <Footer />  
    </div>  
    );  
    };   
export default Short;
    


