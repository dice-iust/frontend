// import React from 'react'; 
import './alltours.scss'; 
import React, { useState } from 'react';  
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


 


const TourList = () => { 
    
    const categories = [  
        { id: 1, name: 'Up comingTrips', image: 'https://img.freepik.com/free-vector/time-management-concept-landing-page_23-2148246951.jpg' },
        { id: 2, name: 'Short Trips', image: 'https://img.freepik.com/free-vector/time-travel-agency-web-site-vacation-tourism-illustration-man-with-ticket-hand-backpack-suitcase-baggage-running-plane-people-visit-countries-cities-landmarks_126523-2351.jpg?t=st=1731946833~exp=1731950433~hmac=ba7d41a82b0169b4e78833810f20c3577486f60f4b09a8fef15f7e35c82db0ef&w=740' },    
        { id: 3, name: 'Spring Trips', image: 'https://img.freepik.com/premium-vector/smiling-female-tourist-with-travel-bags-vacation_1310786-25862.jpg' },  
        { id: 4, name: 'Summer Trips', image: 'https://img.freepik.com/free-vector/beach-vacations_24908-53903.jpg' },  
        { id: 5, name: 'Autumn Trips', image: 'https://img.freepik.com/free-vector/hand-drawn-flat-autumn-illustration_23-2149102842.jpg' }, 
        { id: 6, name: 'Winter Trips', image: 'https://img.freepik.com/free-vector/flat-christmas-travel-illustration_23-2149739903.jpg' },  
        { id: 7, name: 'Fancy Trips', image: 'https://img.freepik.com/free-vector/local-tourism-concept_52683-42353.jpg' },  
        { id: 8, name: 'economical Trips', image: 'https://img.freepik.com/premium-vector/happy-girl-makes-money_203228-281.jpg' },  
      ];  


  
  const tours = [  
    {  
      id: 4,  
      name: "City Trip1",  
      date: "2023-03-15",  
      photo: "https://plus.unsplash.com/premium_photo-1697729905164-f61ad5207758?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVocmFufGVufDB8fDB8fHww",
      destination: "Tehran",  
      admin: { name: "Admin5", photo: "https://clipart-library.com/2023/Admin-Profile-Vector-PNG-Clipart.png" }, 
      type : "economical" , 
      startPlace : "Isfahan",
      transportation : "Car",
       returnDate : "2023-11-27",
       travellers:15,

    }, 
    {  
        id: 2,  
        name: "Nature Trip2",  
        date: "2023-01-15",  
        photo: "https://cdn.nody.ir/files/2021/10/25/nody-%D8%B9%DA%A9%D8%B3-%D8%B2%DB%8C%D8%A8%D8%A7-%D8%A7%D8%B2-%D9%BE%D8%A7%DB%8C%DB%8C%D8%B2-%D8%B4%D9%85%D8%A7%D9%84-1635137298.jpg",  
        admin: { name: "Admin5", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZQdHyyrnf31L6mDHY72cGoNXd_lzO8AHv1Asoj3Vtb2cBPcspyi_Fl3R1Ar1RjdtcRhk&usqp=CAU" },  
        destination: "Gilan", 
        type : "fancy" ,
        startPlace : "Tehran",
        transportation : "Train",
         returnDate : "2023-11-24",
         travellers:2,
      }, 
    {  
        id: 1,  
        name: "City Trip3",  
        date: "2023-02-10",  
        photo: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/c22254fa-16b3-4b2d-93b5-1d137d507a04/9326e659-781d-4b90-89b2-106c1bf54c18.png",
        admin: { name: "Admin5", photo: "https://png.pngtree.com/png-clipart/20230408/original/pngtree-admin-of-female-job-vacancies-png-image_9037122.png" },  
        type : "economical" ,
        destination: "Shiraz", 
        startPlace : "Yazd",
        transportation : "Plane",
         returnDate : "2023-10-25",
         travellers:12,
      }, 
      {  
        id: 1,  
        name: "City Trip3",  
        date: "2023-11-10",  
        photo: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/c22254fa-16b3-4b2d-93b5-1d137d507a04/9326e659-781d-4b90-89b2-106c1bf54c18.png",
        admin: { name: "Admin5", photo: "https://png.pngtree.com/png-clipart/20230408/original/pngtree-admin-of-female-job-vacancies-png-image_9037122.png" },  
        type : "economical" ,
        destination: "Shiraz", 
        startPlace : "Yazd",
        transportation : "Plane",
         returnDate : "2023-10-25",
         travellers:12,
      }, 
      
      {  
        id: 3,  
        name: "Adventure Trip4",  
        date: "2024-7-22",  
        photo: "https://cdn.mashreghnews.ir/d/2021/07/06/4/3192979.jpg",
        destination: "sari", 
        admin: { name: "Admin5", photo: "https://png.pngitem.com/pimgs/s/111-1114718_transparent-sleep-icon-png-person-icon-circle-png.png" },   
        type : "fancy", 
        startPlace : "Tehran",
        transportation : "Bus",
         returnDate : "2023-12-23",
         travellers:2,
      }, 
      {  
        id: 3,  
        name: "Adventure Trip4",  
        date: "2024-4-22",  
        photo: "https://cdn.mashreghnews.ir/d/2021/07/06/4/3192979.jpg",
        destination: "sari", 
        admin: { name: "Admin5", photo: "https://png.pngitem.com/pimgs/s/111-1114718_transparent-sleep-icon-png-person-icon-circle-png.png" },   
        type : "fancy", 
        startPlace : "Tehran",
        transportation : "Bus",
         returnDate : "2023-12-23",
         travellers:2,
      },  
      {  
        id: 3,  
        name: "Adventure Trip4",  
        date: "2024-4-22",  
        photo: "https://cdn.mashreghnews.ir/d/2021/07/06/4/3192979.jpg",
        destination: "sari", 
        admin: { name: "Admin5", photo: "https://png.pngitem.com/pimgs/s/111-1114718_transparent-sleep-icon-png-person-icon-circle-png.png" },   
        type : "fancy", 
        startPlace : "Tehran",
        transportation : "Bus",
         returnDate : "2023-12-23",
         travellers:2,
      },  
      {  
        id: 3,  
        name: "Adventure Trip4",  
        date: "2024-4-22",  
        photo: "https://cdn.mashreghnews.ir/d/2021/07/06/4/3192979.jpg",
        destination: "sari", 
        admin: { name: "Admin5", photo: "https://png.pngitem.com/pimgs/s/111-1114718_transparent-sleep-icon-png-person-icon-circle-png.png" },   
        type : "fancy", 
        startPlace : "Tehran",
        transportation : "Bus",
         returnDate : "2023-12-23",
         travellers:2,
      },  
    {  
        id: 5,  
        name: "Winter Trip ",  
        date: "2023-12-20",  
        photo: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGYtNDAtbHVrZXN0YWNrcG9vbGUtc2tpLXNsb3BlLmpwZw.jpg",
        destination: "Mazandaran",  
        admin: { name: "Admin5", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz8eSw47BxCpB5qcTaEsA_U7poqHaCDa0ZAQ&s" }, 
        type : "economical" ,
        startPlace : "Babol",
        transportation : "Train",
        returnDate : "2023-12-21",
        travellers:6,
      }, 
      {  
        id: 5,  
        name: "Winter Trip 3",  
        date: "2023-12-20",  
        photo: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGYtNDAtbHVrZXN0YWNrcG9vbGUtc2tpLXNsb3BlLmpwZw.jpg",
        destination: "Mazandaran",  
        admin: { name: "Admin5", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz8eSw47BxCpB5qcTaEsA_U7poqHaCDa0ZAQ&s" }, 
        type : "economical" ,
        startPlace : "Babol",
        transportation : "Train",
        returnDate : "2023-12-21",
        travellers:6,
      }, 
      {  
        id: 5,  
        name: "Winter Trip2 ",  
        date: "2023-12-20",  
        photo: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGYtNDAtbHVrZXN0YWNrcG9vbGUtc2tpLXNsb3BlLmpwZw.jpg",
        destination: "Mazandaran",  
        admin: { name: "Admin5", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz8eSw47BxCpB5qcTaEsA_U7poqHaCDa0ZAQ&s" }, 
        type : "economical" ,
        startPlace : "Babol",
        transportation : "Train",
        returnDate : "2023-12-21",
        travellers:6,
      }, 
      {  
        id: 5,  
        name: "Winter Trip ",  
        date: "2023-12-20",  
        photo: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGYtNDAtbHVrZXN0YWNrcG9vbGUtc2tpLXNsb3BlLmpwZw.jpg",
        destination: "Mazandaran",  
        admin: { name: "Admin5", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz8eSw47BxCpB5qcTaEsA_U7poqHaCDa0ZAQ&s" }, 
        type : "economical" ,
        startPlace : "Babol",
        transportation : "Train",
        returnDate : "2023-12-21",
        travellers:106,
      }, 
      {  
        id: 4,  
        name: "City Trip",  
        date: "2024-4-15",  
        photo: "https://plus.unsplash.com/premium_photo-1697729905164-f61ad5207758?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVocmFufGVufDB8fDB8fHww",
        destination: "Tehran",  
        admin: { name: "Admin5", photo: "https://clipart-library.com/2023/Admin-Profile-Vector-PNG-Clipart.png" }, 
        type : "economical" , 
        startPlace : "Isfahan",
        transportation : "Car",
         returnDate : "2023-11-27",
         travellers:7,
      }, 
      {  
        id: 4,  
        name: "City Trip",  
        date: "2024-7-15",  
        photo: "https://plus.unsplash.com/premium_photo-1697729905164-f61ad5207758?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVocmFufGVufDB8fDB8fHww",
        destination: "Tehran",  
        admin: { name: "Admin5", photo: "https://clipart-library.com/2023/Admin-Profile-Vector-PNG-Clipart.png" }, 
        type : "economical" , 
        startPlace : "Isfahan",
        transportation : "Car",
         returnDate : "2023-11-27",
         travellers:50,
      }, 
      {  
        id: 4,  
        name: "City Trip",  
        date: "2024-11-01",  
        photo: "https://plus.unsplash.com/premium_photo-1697729905164-f61ad5207758?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVocmFufGVufDB8fDB8fHww",
        destination: "Tehran",  
        admin: { name: "Admin5", photo: "https://clipart-library.com/2023/Admin-Profile-Vector-PNG-Clipart.png" }, 
        type : "economical" , 
        startPlace : "Isfahan",
        transportation : "Car",
         returnDate : "2023-11-27",
         travellers:30,
      }, 
      {  
        id: 3,  
        name: "Adventure Trip",  
        date: "2024-8-20",  
        photo: "https://cdn.mashreghnews.ir/d/2021/07/06/4/3192979.jpg",
        destination: "sari", 
        admin: { name: "Admin5", photo: "https://png.pngitem.com/pimgs/s/111-1114718_transparent-sleep-icon-png-person-icon-circle-png.png" },   
        type : "fancy", 
        startPlace : "Tehran",
        transportation : "Bus",
         returnDate : "2023-12-23",
         travellers:30,
      }, 
      {  
        id: 3,  
        name: "Adventure Trip",  
        date: "2024-11-20",  
        photo: "https://cdn.mashreghnews.ir/d/2021/07/06/4/3192979.jpg",
        destination: "sari", 
        admin: { name: "Admin5", photo: "https://png.pngitem.com/pimgs/s/111-1114718_transparent-sleep-icon-png-person-icon-circle-png.png" },   
        type : "fancy", 
        startPlace : "Tehran",
        transportation : "Bus",
         returnDate : "2024-10-23",
         travellers:30,
      },  
      {  
        id: 3,  
        name: "Adventure Trip--",  
        date: "2024-11-20",  
        photo: "https://cdn.mashreghnews.ir/d/2021/07/06/4/3192979.jpg",
        destination: "sari", 
        admin: { name: "Admin5", photo: "https://png.pngitem.com/pimgs/s/111-1114718_transparent-sleep-icon-png-person-icon-circle-png.png" },   
        type : "fancy", 
        startPlace : "Tehran",
        transportation : "Bus",
         returnDate : "2024-10-23",
         travellers:30,
      },  
    
      
   
   
   
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
    
    
    
   
    
    responsive: [  
      {  
        breakpoint: 1024,  
        settings: {  
          slidesToShow: 2,  
          slidesToScroll: 1,
          centerPadding: '0px'  
        }  
      },  
      {  
        breakpoint: 600,  
        settings: {  
          slidesToShow: 1,  
          slidesToScroll: 1,  
        }  
      }  
    ]  
  };  

  return (  
    <div>
      <Travelsnav/>
    <div className="tour-list-container"> 
    
      <br></br>
      <h1>Categories</h1>  

<div className="category-cards">  
  {categories.map((category) => (  
    <div key={category.id} className="card">  
      <img src={category.image} alt={category.name} className="card-image" />  
      <h3 className="card-title"><IoIosArrowBack className='moveicon2' />{category.name}</h3>  
    </div>  
  ))}  
</div>  
<br></br>
<br></br>
      <h1>Popular Trips</h1>  
      <Slider {...settings}>  
      {tours  
  .sort((a, b) => b.travellers - a.travellers)  
  .slice(0, 5)  
  .map((tour) => (  
    <div key={tour.id} className="tour-card">  
      <div className="tour-image-container">  
        <img  
          src={tour.photo}  
          alt={`Image of ${tour.name}`}  
          className="tour-image"  
        />  
        {tour.admin && (  
          <div className="tour-admin">  
            <img  
              src={tour.admin.photo}  
              alt={`Profile of ${tour.admin.name}`}  
              className="admin-photo"  
            />  
            {tour.admin.name}  
          </div>  
        )}  
        {/* <div className={`tour-type-mark ${tour.type}`}>  
          <GrMoney aria-hidden="true" />{" "}  
          {tour.type.charAt(0).toUpperCase() + tour.type.slice(1)}  
        </div>   */}
      </div>  
      <div className="tour-info">  
      <p className="tour-meta3">  
      <span className="tour-name">{tour.name}</span>  
      <div className={`trip-type ${tour.type}`}>  
          <GrMoney aria-hidden="true" />{" "}  
          {tour.type.charAt(0).toUpperCase() + tour.type.slice(1)}  {/* Capitalize the tour type */}  
        </div>  
        
      </p>  
        <div className="tour-details">  
        <p className="tour-route">  
    <span className="tour-text">{tour.startPlace} {getTransportationIcon(tour.transportation)} {tour.destination}</span>  
    {/* This renders the icon */}  
</p>  
        </div>  
        <div className="tour-meta">  
          <p className="tour-dates">  
            <FaRegCalendar className='moveicon3' />  
            <span>{formatDate(tour.date)}</span>  
          </p>  
          <FaArrowRight className='moveicon4' />  
          <p className="tour-length" style={{ textAlign: "center" }}>  
            <FaUndoAlt className='moveicon3' />  
            {formatDate(tour.returnDate)}  
          </p>  
        </div>  
      </div>  
    </div>  
  ))}
</Slider>
<br></br>
<br></br>
<br></br>
      
      
       
      </div>  
       <Footer /> 
       </div>
    
);  
};  


export default TourList;  