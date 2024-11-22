// import React from 'react'; 
import './Upcomingtrips.scss'; 
import axios  from "../../api/axios.js";
import React, { useEffect, useState } from "react"; 
// import { MdDateRange } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { FaCarSide } from "react-icons/fa6";
import { FaPlane } from "react-icons/fa";
import { TbTrain } from "react-icons/tb";
import { TbBus } from "react-icons/tb";
import { FaUndoAlt } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa6";
// import "slick-carousel/slick/slick.css";   
// import "slick-carousel/slick/slick-theme.css";  
// import Slider from "react-slick"; 
import Travelsnav from "./Nav.jsx";
// import populartours from "./populartours.jsx";
import Footer from './footer.jsx';
// import { FaArrowRight } from "react-icons/fa";
// import { IoIosArrowBack } from "react-icons/io";
import { IoIosTimer } from "react-icons/io";



const UpcominTravels_URL = 'travels/upcoming/';


const Upcoming = () => { 
    

  const [data, setData] = useState(null);
  useEffect(() => {  
      const fetchData = async () => {  
          try {  
              const response = await axios.get( UpcominTravels_URL);  
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
      <div className='upcoming'>  
        <Travelsnav/>
          <div className="tour-list-container2">
          {data && data.Popular_Trips ? (  
              <div className="tour-list2">  
                  {data.Upcoming_Trips.map((tour) => {   
                          <div key={tour.id} className="tour-card2">  
                              <div className="tour-image-container2">  
                                  <img  
                                      src={tour.image_url}  
                                      alt={`Image of ${tour.name}`}  
                                      className="tour-image"  
                                  />  
                                  {tour.admin && (  
                                      <div className="tour-admin2">  
                                          <img  
                                              src={tour.admin.photo}  
                                              alt={`Profile of ${tour.admin.name}`}  
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
                                          {tour.type.charAt(0).toUpperCase() + tour.mode.slice(1)}  
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
                                          <FaUndoAlt className='moveicon3'/>  
                                          {formatDate(tour.end_date)}  
                                      </p>  
                                  </div> 
                                  {/* <div className="tour-meta7">  
                                      <p className="tour-dates2"> 
                                        <IoIosTimer  className='moveicon3'/> 
                                          Time Left : <span>{(tour.timeLeft)}</span>  days
                                      </p>  
                                  </div>  */}
                              </div>  
                          </div>  
                      ;  
                  })}  
              </div>
               ) : (  
                <p>Loading upcoming trips...</p>  
              )}    
          </div> 
          <br></br> 
          <Footer />  
      </div>  
  );  
};  
export default Upcoming;
    


