import './MyTrips.scss';   

import axios from "../../../api/axios.js";  
import React, { useEffect, useState } from "react";   
import { useNavigate } from 'react-router-dom';  
import { GrMoney } from "react-icons/gr";  
import { FaCarSide } from "react-icons/fa6";  
import { FaPlane } from "react-icons/fa";  
import { TbTrain } from "react-icons/tb";  
import { TbBus } from "react-icons/tb";  
import { FaUndoAlt } from "react-icons/fa";  
import { FaRegCalendar } from "react-icons/fa6"; 


const UpcominTravels_URL = 'travels/upcoming/';  

const TourList = () => {   
  const [activeTab, setActiveTab] = useState("London");  
  const navigate = useNavigate();  

  const openCity = (cityName) => {  
    setActiveTab(cityName);  
  };  
  const [data, setData] = useState(null);  

  useEffect(() => {  
      const fetchData = async () => {  
          try {  
              const response = await axios.get(UpcominTravels_URL);  
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
              return <TbTrain className="moveicon2" />;  
          case 'bus':  
              return <TbBus className="moveicon2" />;  
          case 'plane':  
              return <FaPlane className="moveicon2" />;  
          case 'car':  
              return <FaCarSide className="moveicon2"/>;  
          default:  
              return null;  
      }  
  };  


  return (   
    <div className="w3-container">  
      <h2 style={{color:"#22487a"}}>My Trips</h2>  

      <div className="w3-row">  
        <div className={`tablink ${activeTab === 'London' ? 'w3-border-red' : ''}`} onClick={() => openCity('London')}>  
          Current  
        </div>  
        <div className={`tablink ${activeTab === 'Paris' ? 'w3-border-red' : ''}`} onClick={() => openCity('Paris')}>  
          Future  
        </div>  
        <div className={`tablink ${activeTab === 'Tokyo' ? 'w3-border-red' : ''}`} onClick={() => openCity('Tokyo')}>  
          Past  
        </div>  
      </div>  

      {activeTab === 'London' && (  
        <div className="city">  
          <h2>Current Trips</h2>  

            <br/>     
            <div className="tour-list-container2">  
                {data && data.Up_comingTrips ? (  
                    <div className="tour-list2">  
                        {data.Up_comingTrips.map((tour) => (  
                            <div key={tour.Id} className="tour-card2">  
                                <div className="tour-image-container2">  
                                    <img  
                                        src={tour.image_url}  
                                        alt={`Image of ${tour.name}`}  
                                        className="tour-image2"  
                                    />  
                                    {tour.admin && (  
                                        <div className="tour-admin2">  
                                            <img  
                                                src={tour.admin.phrofile_image}   
                                                alt={`Profile of ${tour.admin.user_name}`}  
                                                className="admin-photo2"  
                                            />  
                                            {tour.admin.user_name}   
                                        </div>  
                                    )}  
                                </div>  
                                <div className="tour-info2">  
                                    <p className="tour-meta3">  
                                        <span className="tour-name2">{tour.name}</span>  
                                        <div className={`trip-type2 ${tour.mode}`}>  
                                            <GrMoney aria-hidden="true" />{" "}  
                                            {tour.mode.charAt(0).toUpperCase() + tour.mode.slice(1)}  
                                        </div>  
                                    </p>  
                                    <div className="tour-details2">  
                                        <p className="tour-route2">  
                                            <span className="tour-text2">{tour.start_place} {getTransportationIcon(tour.transportation)} {tour.destination}</span>  
                                        </p>  
                                    </div>  
                                    <div className="tour-meta7">  
                                        <p className="tour-dates2">  
                                            <FaRegCalendar className='moveicon3' />  
                                            <span>{formatDate(tour.start_date)}</span>  
                                        </p>  
                                        <p className="tour-length2" style={{ textAlign: "left" }}>  
                                            <FaUndoAlt className='moveicon3' />  
                                            {formatDate(tour.end_date)}  
                                        </p>  
                                    </div>   
                                </div>  
                            </div>  
                        ))}  
                    </div>  
                ) : (  
                    <p>Loading upcoming trips...</p>  
                )}    
            </div> 
        </div>  
      )}  

      {activeTab === 'Paris' && (  
        <div className="city">  
          <h2>Future Trips</h2>  
          <p>Paris is the capital of France.</p>   
        </div>  
      )}  

      {activeTab === 'Tokyo' && (  
        <div className="city">  
          <h2>Past Trips</h2>  
          <p>Tokyo is the capital of Japan.</p>  
        </div>  
      )}  
    </div>   
  );  
};  

export default TourList;


// // import React from 'react'; 
// import './MyTrips.scss'; 

// import axios  from "../../../api/axios.js";
// import React, { useEffect, useState } from "react"; 
// import { GrMoney } from "react-icons/gr";
// import { FaCarSide } from "react-icons/fa6";
// import { FaPlane } from "react-icons/fa";
// import { TbTrain } from "react-icons/tb";
// import { TbBus } from "react-icons/tb";
// import { FaUndoAlt } from "react-icons/fa";
// import { FaRegCalendar } from "react-icons/fa6";
// import "slick-carousel/slick/slick.css";   
// import "slick-carousel/slick/slick-theme.css";  
// import Slider from "react-slick"; 
// import { FaArrowRight } from "react-icons/fa";
// import { IoIosArrowBack } from "react-icons/io";
// import { Link } from 'react-router-dom'; 
// import { useNavigate } from 'react-router-dom';  


// const TourList = () => { 

//   const [data, setData] = useState(null);
//   const [datapast, setDatapast] = useState(null);
//   const [datafuture, setDatafuture] = useState(null);
//   const navigate = useNavigate();  
//   const getFormData = async () => {  
//     try {  
//       const response = await axios.get("https://triptide.pythonanywhere.com/mytravels/", {  
//         headers: { Authorization: localStorage.getItem("token") },  
//       });  
//       setData(response.current.data); 
//       setDatapast(response.past.data);
//       setDatafuture(response.future.data);
//     } catch (error) {  
//       console.error("Error fetching data:", error);  
//     }  
//   };  

//   useEffect(() => {  
//     const token = localStorage.getItem("token");  
//     if (!token) {  
//       navigate("/login");  
//     } else {  
//       getFormData();  
//     }  
//   }, []);  
    
  
//   const formatDate = (dateString) => {  
//     const [year, month, day] = dateString.split('-');  
//     return `${year}/${month}/${day}`;  
//   };  

//   const getTransportationIcon = (transportation) => {  
//     switch (transportation.toLowerCase()) {  
//       case 'train':  
//         return <TbTrain className="moveicon"/>;  
//       case 'bus':  
//         return <TbBus className="moveicon" />;  
//       case 'plane':  
//         return <FaPlane className="moveicon" />;  
//       case 'car':  
//         return <FaCarSide className="moveicon"/>;  
//       default:  
//         return null;  
//     }  
//   };

//     const currentDate = new Date();  
//     const currentYear = currentDate.getFullYear();  
//     const currentMonth = currentDate.getMonth();   

//     const settings = {  
//       dots: true,  
//       infinite: true,  
//       speed: 500,  
//       slidesToShow: 2,  
//       slidesToScroll: 1,  
//       centerMode: true,  
//       centerPadding: '236px', 
//       swipe: true, 
//       swipeToSlide: true, 
//       touchMove: true,   
//       responsive: [  
//         {  
//           breakpoint: 1200,  
//           settings: {  
//             slidesToShow: 2,  
//             slidesToScroll: 1,  
//             centerPadding: '20px', // Adjusted for better visibility  
//           }  
//         },  
//         {  
//           breakpoint: 1024,  
//           settings: {  
//             slidesToShow: 2,  
//             slidesToScroll: 1,  
//             centerPadding: '10px',  
//           }  
//         },  
//         {  
//           breakpoint: 600,  
//           settings: {  
//             slidesToShow: 1,  
//             slidesToScroll: 1,  
//             centerPadding: '30px', // No padding for better fit  
//           }  
//         },  
//         {  
//           breakpoint: 480,  
//           settings: {  
//             slidesToShow: 1,  
//             slidesToScroll: 1,  
//             centerPadding: '5px', // No padding for better fit  
//           }  
//         },  
//       ]  
//     };

//     return (   
//       <div className='app-container-main-profile'>   
//         <div className='travelpage-profile'>  
//           <div className="tour-list-container-profile">   
//             <br />  
//             <br />  
//             <h1>Current Trips</h1>   
//             <br />   
//             {data.length > 0 ? (  
//               <Slider {...settings}>  
//                 {data.map((trip) => (  
//                   <div key={trip.id} className="tour-card-profile">  
//                     <div className="tour-image-container-profile">  
//                       <img  
//                         src={trip.image_url}  
//                         alt={`Image of ${trip.name}`}  
//                         className="tour-image-profile"  
//                       />  
//                       {trip.admin && (  
//                         <div className="tour-admin-profile">  
//                           <img  
//                             src={trip.admin.profile_image}  
//                             alt={`Profile of ${trip.admin.user_name}`}  
//                             className="admin-photo-profile"  
//                           />  
//                           {trip.admin.user_name}  
//                         </div>  
//                       )}  
//                     </div>  
//                     <div className="tour-info-profile">  
//                       <p className="tour-meta3-profile">  
//                         <span className="tour-name-profile">{trip.name}</span>  
//                         <div className={`trip-type ${trip.mode}`}>  
//                           <GrMoney aria-hidden="true" />  
//                           {trip.mode.charAt(0).toUpperCase() + trip.mode.slice(1)}  
//                         </div>  
//                       </p>  
//                       <div className="tour-details-profile">  
//                         <p className="tour-route-profile">  
//                           <span className="tour-text-profile">  
//                             {trip.start_place} {getTransportationIcon(trip.transportation)} {trip.destination}  
//                           </span>  
//                         </p>  
//                       </div>  
//                       <div className="tour-meta-profile">  
//                         <p className="tour-date-profile">  
//                           <FaRegCalendar className='moveicon3-profile' />  
//                           <span>{formatDate(trip.start_date)}</span>  
//                         </p>  
//                         <FaArrowRight className='moveicon4-profile' />  
//                         <p className="tour-length-profile" style={{ textAlign: "center" }}>  
//                           <FaUndoAlt className='moveicon3-profile' />  
//                           {formatDate(trip.end_date)}  
//                         </p>  
//                       </div>  
//                     </div>  
//                   </div>  
//                 ))}  
//               </Slider>  
//             ) : (  
//               <p>No current trips available.</p>  
//             )}   
//           </div>   
//           <br />  
//           <br />  
//           <br />  
//           <div className="tour-list-container-profile">   
//             <br />  
//             <br />  
//             <h1>Future Trips</h1>   
//             <br />   
//             {datafuture.length > 0 ? (  
//               <Slider {...settings}>  
//                 {datafuture.map((trip) => (  
//                   <div key={trip.id} className="tour-card-profile">  
//                     <div className="tour-image-container-profile">  
//                       <img  
//                         src={trip.image_url}  
//                         alt={`Image of ${trip.name}`}  
//                         className="tour-image-profile"  
//                       />  
//                       {trip.admin && (  
//                         <div className="tour-admin-profile">  
//                           <img  
//                             src={trip.admin.profile_image}  
//                             alt={`Profile of ${trip.admin.user_name}`}  
//                             className="admin-photo-profile"  
//                           />  
//                           {trip.admin.user_name}  
//                         </div>  
//                       )}  
//                     </div>  
//                     <div className="tour-info-profile">  
//                       <p className="tour-meta3-profile">  
//                         <span className="tour-name-profile">{trip.name}</span>  
//                         <div className={`trip-type ${trip.mode}`}>  
//                           <GrMoney aria-hidden="true" />  
//                           {trip.mode.charAt(0).toUpperCase() + trip.mode.slice(1)}  
//                         </div>  
//                       </p>  
//                       <div className="tour-details-profile">  
//                         <p className="tour-route-profile">  
//                           <span className="tour-text-profile">  
//                             {trip.start_place} {getTransportationIcon(trip.transportation)} {trip.destination}  
//                           </span>  
//                         </p>  
//                       </div>  
//                       <div className="tour-meta-profile">  
//                         <p className="tour-date-profile">  
//                           <FaRegCalendar className='moveicon3-profile' />  
//                           <span>{formatDate(trip.start_date)}</span>  
//                         </p>  
//                         <FaArrowRight className='moveicon4-profile' />  
//                         <p className="tour-length-profile" style={{ textAlign: "center" }}>  
//                           <FaUndoAlt className='moveicon3-profile' />  
//                           {formatDate(trip.end_date)}  
//                         </p>  
//                       </div>  
//                     </div>  
//                   </div>  
//                 ))}  
//               </Slider>  
//             ) : (  
//               <p>No future trips available.</p>  
//             )}   
//           </div>   
//           <br />  
//           <br />  
//           <br />  
//           <div className="tour-list-container-profile">   
//             <br />  
//             <br />  
//             <h1>Past Trips</h1>   
//             <br />   
//             {datapast.length > 0 ? (  
//               <Slider {...settings}>  
//                 {datapast.map((trip) => (  
//                   <div key={trip.id} className="tour-card-profile">  
//                     <div className="tour-image-container-profile">  
//                       <img  
//                         src={trip.image_url}  
//                         alt={`Image of ${trip.name}`}  
//                         className="tour-image-profile"  
//                       />  
//                       {trip.admin && (  
//                         <div className="tour-admin-profile">  
//                           <img  
//                             src={trip.admin.profile_image}  
//                             alt={`Profile of ${trip.admin.user_name}`}  
//                             className="admin-photo-profile"  
//                           />  
//                           {trip.admin.user_name}  
//                         </div>  
//                       )}  
//                     </div>  
//                     <div className="tour-info-profile">  
//                       <p className="tour-meta3-profile">  
//                         <span className="tour-name-profile">{trip.name}</span>  
//                         <div className={`trip-type ${trip.mode}`}>  
//                           <GrMoney aria-hidden="true" />  
//                           {trip.mode.charAt(0).toUpperCase() + trip.mode.slice(1)}  
//                         </div>  
//                       </p>  
//                       <div className="tour-details-profile">  
//                         <p className="tour-route-profile">  
//                           <span className="tour-text-profile">  
//                             {trip.start_place} {getTransportationIcon(trip.transportation)} {trip.destination}  
//                           </span>  
//                         </p>  
//                       </div>  
//                       <div className="tour-meta-profile">  
//                         <p className="tour-date-profile">  
//                           <FaRegCalendar className='moveicon3-profile' />  
//                           <span>{formatDate(trip.start_date)}</span>  
//                         </p>  
//                         <FaArrowRight className='moveicon4-profile' />  
//                         <p className="tour-length-profile" style={{ textAlign: "center" }}>  
//                           <FaUndoAlt className='moveicon3-profile' />  
//                           {formatDate(trip.end_date)}  
//                         </p>  
//                       </div>  
//                     </div>  
//                   </div>  
//                 ))}  
//               </Slider>  
//             ) : (  
//               <p>No past trips available.</p>  
//             )}   
//           </div>   
//           <br />  
//           <br />  
//           <br />  
//         </div>  
//       </div>  
//     );  
//   };  
  
//   export default TourList;  
