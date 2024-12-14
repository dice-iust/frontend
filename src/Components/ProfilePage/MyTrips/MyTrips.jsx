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
import { Link } from 'react-router-dom'; 


const mytravels_URL = 'mytravels';  

const TourList = () => {   
  const [activeTab, setActiveTab] = useState("London");  
  const navigate = useNavigate();  
  const [datacurrent, setDatacurrent] = useState(null);
  const [dataphoto, setDataphoto] = useState(null);
  const [datapast, setDatapast] = useState(null);
  const [datafuture, setDatafuture] = useState(null);
  const openCity = (cityName) => {  
    setActiveTab(cityName);  
  };  
 
  useEffect(() => {  
      const fetchData = async () => {  
          try {  
              const response = await axios.get(mytravels_URL, {  
                headers: { Authorization: localStorage.getItem("token") },  
              });   
              setDatacurrent(response.data.current);
              setDatapast(response.data.past)  ;
              setDatafuture(response.data.future);
              setDataphoto(response.data.photo);
              console.log(response.data);  
              console.log(datafuture);
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
          <h2 style={{color:"#22487a"}}>Current Trips</h2>  
          <br/>     
            <div className="tour-list-container2">  
                {datacurrent && datacurrent.length >=1 ? (  
                    <div className="tour-list2">  
                        {datacurrent.map((tour) => (  
                            <div key={tour.travel_is.Id} className="tour-card2">  
                                <div className="tour-image-container2">  
                                    <img  
                                        src={tour.travel_is.image_url}  
                                        alt={`Image of ${tour.name}`}  
                                        className="tour-image2"  
                                    />  
                                    {tour.travel_is.admin && (  
                                        <div className="tour-admin2">  
                                            <img  
                                                src={tour.travel_is.admin.phrofile_image}   
                                                alt={`Profile of ${tour.travel_is.admin.user_name}`}  
                                                className="admin-photo2"  
                                            />  
                                            {tour.travel_is.admin.user_name}   
                                        </div>  
                                    )}  
                                </div>  
                                <div className="tour-info2">  
                                    <p className="tour-meta3">  
                                        <span className="tour-name2">{tour.travel_is.name}</span>  
                                        <div className={`trip-type2 ${tour.travel_is.mode}`}>  
                                            <GrMoney aria-hidden="true" />{" "}  
                                            {tour.travel_is.mode.charAt(0).toUpperCase() + tour.travel_is.mode.slice(1)}  
                                        </div>  
                                    </p>  
                                    <div className="tour-details2">  
                                        <p className="tour-route2">  
                                            <span className="tour-text2">{tour.travel_is.start_place} {getTransportationIcon(tour.travel_is.transportation)} {tour.travel_is.destination}</span>  
                                        </p>  
                                    </div>  
                                    <div className="tour-meta7">  
                                        <p className="tour-dates2">  
                                            <FaRegCalendar className='moveicon3' />  
                                            <span>{formatDate(tour.travel_is.start_date)}</span>  
                                        </p>  
                                        <p className="tour-length2" style={{ textAlign: "left" }}>  
                                            <FaUndoAlt className='moveicon3' />  
                                            {formatDate(tour.travel_is.end_date)}  
                                        </p>  
                                    </div>   
                                </div>  
                            </div>  
                        ))}  
                    </div>  
                ) : (  
                <div style={{ textAlign: "center"}}> 
                    <br/> 
                    <p style={{ fontWeight: "bold", fontSize: "20px"}}>You have no current trips!</p>  
                        <img src={dataphoto} alt="No trips" />  

                </div>
                )}    
            </div> 
        </div>  
      )}  

      {activeTab === 'Paris' && (  
        <div className="city">  
          <h2 style={{color:"#22487a"}}>Future Trips</h2>  
          <br/>     
            <div className="tour-list-container2">  
                {datafuture && datafuture.length>=1 ? (  
                    <div className="tour-list2">  
                        {datafuture.map((tour) => (  
                            <div key={tour.travel_is.Id} className="tour-card2">  
                                <div className="tour-image-container2">  
                                    <img  
                                        src={tour.travel_is.image_url}  
                                        alt={`Image of ${tour.name}`}  
                                        className="tour-image2"  
                                    />  
                                    {tour.travel_is.admin && (  
                                        <div className="tour-admin2">  
                                            <img  
                                                src={tour.travel_is.admin.phrofile_image}   
                                                alt={`Profile of ${tour.travel_is.admin.user_name}`}  
                                                className="admin-photo2"  
                                            />  
                                            {tour.travel_is.admin.user_name}   
                                        </div>  
                                    )}  
                                </div>  
                                <div className="tour-info2">  
                                    <p className="tour-meta3">  
                                        <span className="tour-name2">{tour.travel_is.name}</span>  
                                        <div className={`trip-type2 ${tour.travel_is.mode}`}>  
                                            <GrMoney aria-hidden="true" />{" "}  
                                            {tour.travel_is.mode.charAt(0).toUpperCase() + tour.travel_is.mode.slice(1)}  
                                        </div>  
                                    </p>  
                                    <div className="tour-details2">  
                                        <p className="tour-route2">  
                                            <span className="tour-text2">{tour.travel_is.start_place} {getTransportationIcon(tour.travel_is.transportation)} {tour.travel_is.destination}</span>  
                                        </p>  
                                    </div>  
                                    <div className="tour-meta7">  
                                        <p className="tour-dates2">  
                                            <FaRegCalendar className='moveicon3' />  
                                            <span>{formatDate(tour.travel_is.start_date)}</span>  
                                        </p>  
                                        <p className="tour-length2" style={{ textAlign: "left" }}>  
                                            <FaUndoAlt className='moveicon3' />  
                                            {formatDate(tour.travel_is.end_date)}  
                                        </p>  
                                    </div>   
                                </div>  
                            </div>  
                        ))}  
                    </div>  
                ) : (  
                    <div style={{ textAlign: "center"}}> 
                    <br/> 
                    <p style={{ fontWeight: "bold", fontSize: "20px"}}>You have no future trips!</p>  
                        <img src={dataphoto} alt="No trips" />  

                </div>
                )}    
            </div> 
        </div>  
      )}  

      {activeTab === 'Tokyo' && (  
        <div className="city">  
          <h2 style={{color:"#22487a"}}>Past Trips</h2>  
          <br/>     
            <div className="tour-list-container2">  
                {datapast && datapast.length>=1 ? (  
                    <div className="tour-list2">  
                        {datapast.map((tour) => (  
                            <div key={tour.travel_is.Id} className="tour-card2">  
                                <div className="tour-image-container2">  
                                    <img  
                                        src={tour.travel_is.image_url}  
                                        alt={`Image of ${tour.name}`}  
                                        className="tour-image2"  
                                    />  
                                    {tour.travel_is.admin && (  
                                        <div className="tour-admin2">  
                                            <img  
                                                src={tour.travel_is.admin.phrofile_image}   
                                                alt={`Profile of ${tour.travel_is.admin.user_name}`}  
                                                className="admin-photo2"  
                                            />  
                                            {tour.travel_is.admin.user_name}   
                                        </div>  
                                    )}  
                                </div>  
                                <div className="tour-info2">  
                                    <p className="tour-meta3">  
                                        <span className="tour-name2">{tour.travel_is.name}</span>  
                                        <div className={`trip-type2 ${tour.travel_is.mode}`}>  
                                            <GrMoney aria-hidden="true" />{" "}  
                                            {tour.travel_is.mode.charAt(0).toUpperCase() + tour.travel_is.mode.slice(1)}  
                                        </div>  
                                    </p>  
                                    <div className="tour-details2">  
                                        <p className="tour-route2">  
                                            <span className="tour-text2">{tour.travel_is.start_place} {getTransportationIcon(tour.travel_is.transportation)} {tour.travel_is.destination}</span>  
                                        </p>  
                                    </div>  
                                    <div className="tour-meta7">  
                                        <p className="tour-dates2">  
                                            <FaRegCalendar className='moveicon3' />  
                                            <span>{formatDate(tour.travel_is.start_date)}</span>  
                                        </p>  
                                        <p className="tour-length2" style={{ textAlign: "left" }}>  
                                            <FaUndoAlt className='moveicon3' />  
                                            {formatDate(tour.travel_is.end_date)}  
                                        </p>  
                                    </div>   
                                </div>  
                            </div>  
                        ))}  
                    </div>  
                ) : (  
                    <div style={{ textAlign: "center"}}> 
                    <br/> 
                    <p style={{ fontWeight: "bold", fontSize: "20px"}}>You have no past trips!</p>  
                        <img src={dataphoto} alt="No trips" />  

                </div>
                )}    
            </div> 
        </div>  
      )}  
    </div>   
  );  
};  

export default TourList;


