// import React from 'react'; 
import './MyTrips.scss'; 

import axios  from "../../../api/axios.js";
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
import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom'; 



const PopularTravels_URL = 'travels/';


const TourList = () => { 

  const [data, setData] = useState(null);
  useEffect(() => {  
      const fetchData = async () => {  
          try {  
              const response = await axios.get(PopularTravels_URL);  
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
        return <TbTrain className="moveicon"/>;  
      case 'bus':  
        return <TbBus className="moveicon" />;  
      case 'plane':  
        return <FaPlane className="moveicon" />;  
      case 'car':  
        return <FaCarSide className="moveicon"/>;  
      default:  
        return null;  
    }  
  };

    const currentDate = new Date();  
    const currentYear = currentDate.getFullYear();  
    const currentMonth = currentDate.getMonth();   

    const settings = {  
      dots: true,  
      infinite: true,  
      speed: 500,  
      slidesToShow: 3,  
      slidesToScroll: 1,  
      centerMode: true,  
      centerPadding: '236px', 
      swipe: true, 
      swipeToSlide: true, 
      touchMove: true,   
      responsive: [  
        {  
          breakpoint: 1200,  
          settings: {  
            slidesToShow: 2,  
            slidesToScroll: 1,  
            centerPadding: '20px', // Adjusted for better visibility  
          }  
        },  
        {  
          breakpoint: 1024,  
          settings: {  
            slidesToShow: 2,  
            slidesToScroll: 1,  
            centerPadding: '10px',  
          }  
        },  
        {  
          breakpoint: 600,  
          settings: {  
            slidesToShow: 1,  
            slidesToScroll: 1,  
            centerPadding: '30px', // No padding for better fit  
          }  
        },  
        {  
          breakpoint: 480,  
          settings: {  
            slidesToShow: 1,  
            slidesToScroll: 1,  
            centerPadding: '5px', // No padding for better fit  
          }  
        },  
      ]  
    };

  return ( 
    <div className='app-container-main-profile'> 
    <div className='travelpage-profile'>
    <div className="tour-list-container-profile"> 
    
<br></br>
<br></br>
      <h1>Popular Trips</h1> 
      <br></br> 
      {data && data.Popular_Trips ? (  
          <Slider {...settings}>  
            {data.Popular_Trips.slice(0, 5).map((tour) => (  
              <div key={tour.id} className="tour-card-profile">  
                <div className="tour-image-container-profile">  
                  <img  
                    src={tour.image_url}  
                    alt={`Image of ${tour.name}`}  
                    className="tour-image-profile"  
                  />  
                  {tour.admin && (  
                    <div className="tour-admin-profile">  
                      <img  
                        src={tour.admin.phrofile_image}  
                        alt={`Profile of ${tour.admin.user_name}`}  
                        className="admin-photo-profile"  
                      />  
                      {tour.admin.user_name}  
                    </div>  
                  )}  
                </div>  
                <div className="tour-info-profile">  
                  <p className="tour-meta3-profile">  
                    <span className="tour-name-profile">{tour.name}</span>  
                    <div className={`trip-type ${tour.mode}`}>  
                      <GrMoney aria-hidden="true" />  
                      {tour.mode.charAt(0).toUpperCase() + tour.mode.slice(1)}  
                    </div>  
                  </p>  
                  <div className="tour-details-profile">  
                    <p className="tour-route-profile">  
                      <span className="tour-text-profile">{tour.start_place} {getTransportationIcon(tour.transportation)} {tour.destination}</span>  
                    </p>  
                  </div>  
                  <div className="tour-meta-profile">  
                    <p className="tour-date-profile">  
                      <FaRegCalendar className='moveicon3-profile' />  
                      <span>{formatDate(tour.start_date)}</span>  
                    </p>  
                    <FaArrowRight className='moveicon4-profile' />  
                    <p className="tour-length-profile" style={{ textAlign: "center" }}>  
                      <FaUndoAlt className='moveicon3-profile' />  
                      {formatDate(tour.end_date)}  
                    </p>  
                  </div>  
                </div>  
              </div>  
            ))}  
          </Slider>  
        ) : (  
          <p>Loading popular trips...</p>  
        )} 
        </div> 
<br></br>
<br></br>
<br></br>
      
      
       
      </div>  
       </div>
    
);  
};  


export default TourList;  

