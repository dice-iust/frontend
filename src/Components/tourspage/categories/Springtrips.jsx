// import React from 'react';   
import './Springtrips.scss';   
import axios from "../../../api/axios.js";  
import React, { useEffect, useState } from "react";   
import { GrMoney } from "react-icons/gr";  
import { FaCarSide } from "react-icons/fa6";  
import { FaPlane } from "react-icons/fa";  
import { TbTrain } from "react-icons/tb";  
import { TbBus } from "react-icons/tb";  
import { FaUndoAlt } from "react-icons/fa";  
import { FaRegCalendar } from "react-icons/fa6";  
// import Travelsnav from "../Nav.jsx";  
import Footer from '../footer.jsx';  
import Travelsnav from "../categories_nav.jsx";  
import { IoIosTimer } from "react-icons/io";  

const SpringTravels_URL = 'travels/spring/';  

const Spring = () => {  
  const [data, setData] = useState(null);   
  useEffect(() => {  
    const fetchData = async () => {  
        try {  
            const response = await axios.get(SpringTravels_URL);  
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
  <div className='spring'>  
  <Travelsnav />  
  <br/>
  <br/>
  <div className="tour-list-container-spring">  
      {data && data.Spring_Trips ? (  
          <div className="tour-list-spring">  
              {data.Spring_Trips.map((tour) => (  
                  <div key={tour.Id} className="tour-card-spring">  
                      <div className="tour-image-container-spring">  
                          <img  
                              src={tour.image_url}  
                              alt={`Image of ${tour.name}`}  
                              className="tour-image-spring"  
                          />  
                          {tour.admin && (  
                              <div className="tour-admin-spring">  
                                  <img  
                                      src={tour.admin.phrofile_image}   
                                      alt={`Profile of ${tour.admin.user_name}`}  
                                      className="admin-photo-spring"  
                                  />  
                                  {tour.admin.user_name}   
                              </div>  
                          )}  
                      </div>  
                      <div className="tour-info-spring">  
                          <p className="tour-meta-spring3">  
                              <span className="tour-name-spring">{tour.name}</span>  
                              <div className={`trip-type-spring ${tour.mode}`}>  
                                  <GrMoney aria-hidden="true" />{" "}  
                                  {tour.mode.charAt(0).toUpperCase() + tour.mode.slice(1)}  
                              </div>  
                          </p>  
                          <div className="tour-details-spring">  
                              <p className="tour-route-spring">  
                                  <span className="tour-text-spring">{tour.start_place} {getTransportationIcon(tour.transportation)} {tour.destination}</span>  
                              </p>  
                          </div>  
                          <div className="tour-meta-spring7">  
                              <p className="tour-dates-spring">  
                                  <FaRegCalendar className='moveicon-spring3' />  
                                  <span>{formatDate(tour.start_date)}</span>  
                              </p>  
                              <p className="tour-length-spring" style={{ textAlign: "left" }}>  
                                  <FaUndoAlt className='moveicon-spring3' />  
                                  {formatDate(tour.end_date)}  
                              </p>  
                          </div>   
                      </div>  
                  </div>  
              ))}  
          </div>  
      ) : (  
          <p>Loading spring trips...</p>  
      )}    
  </div>   
  <br/>
  <br/>  
  <Footer />  
</div>  
);  
};   

export default Spring;