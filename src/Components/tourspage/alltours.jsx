// import React from 'react'; 
import './alltours.scss'; 

import axios  from "../../api/axios.js";
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
import Footer from './footer.jsx';
import DateRangePicker from "./Filter/filterbydate.jsx";
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
    
    const categories = [  
        { id: 'UpComing', name: 'Up comingTrips', image: 'https://img.freepik.com/free-vector/time-management-concept-landing-page_23-2148246951.jpg' },
        { id: 'Short', name: 'Short Trips', image: 'https://img.freepik.com/free-vector/time-travel-agency-web-site-vacation-tourism-illustration-man-with-ticket-hand-backpack-suitcase-baggage-running-plane-people-visit-countries-cities-landmarks_126523-2351.jpg?t=st=1731946833~exp=1731950433~hmac=ba7d41a82b0169b4e78833810f20c3577486f60f4b09a8fef15f7e35c82db0ef&w=740' },    
        { id: 'Spring', name: 'Spring Trips', image: 'https://img.freepik.com/premium-vector/smiling-female-tourist-with-travel-bags-vacation_1310786-25862.jpg' },  
        { id: 'Summer', name: 'Summer Trips', image: 'https://img.freepik.com/free-vector/beach-vacations_24908-53903.jpg' },  
        { id: 'Autumn', name: 'Autumn Trips', image: 'https://img.freepik.com/free-vector/hand-drawn-flat-autumn-illustration_23-2149102842.jpg' }, 
        { id: 'Winter', name: 'Winter Trips', image: 'https://img.freepik.com/free-vector/flat-christmas-travel-illustration_23-2149739903.jpg' },  
        { id: 'Fancy', name: 'Fancy Trips', image: 'https://img.freepik.com/free-vector/local-tourism-concept_52683-42353.jpg' },  
        { id: 'Economical', name: 'Economical Trips', image: 'https://img.freepik.com/premium-vector/happy-girl-makes-money_203228-281.jpg' },  
      ];  


  
  
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
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [showQuick, setShowQuick] = useState(false);  
  const [showSpring, setShowSpring] = useState(false); 
  const [showSummer, setShowSummer] = useState(false); 
  const [showAutumn, setShowAutumn] = useState(false); 
  const [showWinter, setShowWinter] = useState(false);  
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
    <div className='app-container-main'> 
    <div className='travelpage'>
      <Travelsnav/>
    <div className="tour-list-container"> 
    
      <br></br>
      <DateRangePicker />
      <br></br>
      <h1>Categories</h1>  
      <br></br>

<div className="category-cards">  
  {categories.map((category) => (  
    <div key={category.id} className="card">  
      <Link key={category.id} to={`/Main/${category.id}`} className="card">  
      <img src={category.image} alt={category.name} className="card-image" />  
      <h3 className="card-title"><IoIosArrowBack className='moveicon2' />{category.name}</h3> 
      </Link>   
    </div>  
  ))}  
</div>  
<br></br>
<br></br>
      <h1>Popular Trips</h1> 
      <br></br> 
      {data && data.Popular_Trips ? (  
          <Slider {...settings}>  
            {data.Popular_Trips.slice(0, 5).map((tour) => (  
              <div key={tour.id} className="tour-card">  
                <div className="tour-image-container">  
                  <img  
                    src={tour.image_url}  
                    alt={`Image of ${tour.name}`}  
                    className="tour-image"  
                  />  
                  {tour.admin && (  
                    <div className="tour-admin">  
                      <img  
                        src={tour.admin.phrofile_image}  
                        alt={`Profile of ${tour.admin.user_name}`}  
                        className="admin-photo"  
                      />  
                      {tour.admin.user_name}  
                    </div>  
                  )}  
                </div>  
                <div className="tour-info">  
                  <p className="tour-meta3">  
                    <span className="tour-name">{tour.name}</span>  
                    <div className={`trip-type ${tour.mode}`}>  
                      <GrMoney aria-hidden="true" />  
                      {tour.mode.charAt(0).toUpperCase() + tour.mode.slice(1)}  
                    </div>  
                  </p>  
                  <div className="tour-details">  
                    <p className="tour-route">  
                      <span className="tour-text">{tour.start_place} {getTransportationIcon(tour.transportation)} {tour.destination}</span>  
                    </p>  
                  </div>  
                  <div className="tour-meta">  
                    <p className="tour-date">  
                      <FaRegCalendar className='moveicon3' />  
                      <span>{formatDate(tour.start_date)}</span>  
                    </p>  
                    <FaArrowRight className='moveicon4' />  
                    <p className="tour-length" style={{ textAlign: "center" }}>  
                      <FaUndoAlt className='moveicon3' />  
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
       <Footer /> 
       </div>
    
);  
};  


export default TourList;  

