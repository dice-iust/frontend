// import React from 'react'; 
import './Springtrips.scss'; 
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
import { IoIosTimer } from "react-icons/io";


 


const Spring = () => { 
    
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
       timeLeft:2

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
         timeLeft:3
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
         timeLeft:5
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
         timeLeft:2
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
         timeLeft:4
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
         timeLeft:1
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
         timeLeft:2
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
         timeLeft:2
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
        timeLeft:2
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
        timeLeft:3
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
        timeLeft:4
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
        timeLeft:2
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
         timeLeft:2
      }, 
      {  
        id: 4,  
        name: "City Trip",  
        date: "2024-11-15",  
        photo: "https://plus.unsplash.com/premium_photo-1697729905164-f61ad5207758?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVocmFufGVufDB8fDB8fHww",
        destination: "Tehran",  
        admin: { name: "Admin5", photo: "https://clipart-library.com/2023/Admin-Profile-Vector-PNG-Clipart.png" }, 
        type : "economical" , 
        startPlace : "Isfahan",
        transportation : "Car",
         returnDate : "2023-11-27",
         travellers:50,
         timeLeft:2
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
         timeLeft:2
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
         timeLeft:2
      }, 
      {  
        id: 3,  
        name: "Adventure Trip",  
        date: "2025-11-20",  
        photo: "https://cdn.mashreghnews.ir/d/2021/07/06/4/3192979.jpg",
        destination: "sari", 
        admin: { name: "Admin5", photo: "https://png.pngitem.com/pimgs/s/111-1114718_transparent-sleep-icon-png-person-icon-circle-png.png" },   
        type : "fancy", 
        startPlace : "Tehran",
        transportation : "Bus",
         returnDate : "2024/10/23",
         travellers:30,
         timeLeft:2
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
         timeLeft:3
      },  
    
      
   
   
   
  ]; 

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
      <div className='spring' >  
        <Travelsnav/>
          <div className="tour-list-container-spring">  
              <div className="tour-list-spring">  
                  {tours.map((tour) => {  
                     
                      return (  
                          <div key={tour.id} className="tour-spring">  
                              <div className="tour-image-container-spring">  
                                  <img  
                                      src={tour.photo}  
                                      alt={`Image of ${tour.name}`}  
                                      className="tour-image-spring"  
                                  />  
                                  {tour.admin && (  
                                      <div className="tour-admin-spring">  
                                          <img  
                                              src={tour.admin.photo}  
                                              alt={`Profile of ${tour.admin.name}`}  
                                              className="admin-photo-spring"  
                                          />  
                                          {tour.admin.name}  
                                      </div>  
                                  )}  
                              </div>  
                              <div className="tour-info-spring">  
                                  <p className="tour-meta-spring3">  
                                      <span className="tour-name-spring">{tour.name}</span>  
                                      <div className={`trip-type-spring ${tour.type}`}>  
                                          <GrMoney aria-hidden="true" />{" "}  
                                          {tour.type.charAt(0).toUpperCase() + tour.type.slice(1)}  
                                      </div>  
                                  </p>  
                                  <div className="tour-details-spring">  
                                      <p className="tour-route-spring">  
                                          <span className="tour-text-spring">{tour.startPlace} {getTransportationIcon(tour.transportation)} {tour.destination}</span>  
                                      </p>  
                                  </div>  
                                  <div className="tour-meta-spring7">  
                                      <p className="tour-dates-spring">  
                                          <FaRegCalendar className='moveicon-spring3' />  
                                          <span>{formatDate(tour.date)}</span>  
                                      </p>  
                                      <p className="tour-length-spring" style={{ textAlign: "left" }}>  
                                          <FaUndoAlt className='moveicon-spring3'/>  
                                          {formatDate(tour.returnDate)}  
                                      </p>  
                                  </div> 
                                  <div className="tour-meta-spring7">  
                                      <p className="tour-dates-spring"> 
                                        <IoIosTimer  className='moveicon-spring3'/> 
                                          Time Left : <span>{(tour.timeLeft)}</span>  days
                                      </p>  
                                  </div> 
                              </div>  
                          </div>  
                      );  
                  })}  
              </div>  
          </div> 
          <br></br> 
          <Footer />  
      </div>  
  );  
};  
export default Spring;
    


