import React, { useEffect, useState } from 'react';  
import './Trips_MainPage.scss';  
import { GiCash } from "react-icons/gi";  
import { BsFillChatFill } from "react-icons/bs";  
import { IoMdPersonAdd } from "react-icons/io";  
import { TbHomeFilled } from "react-icons/tb";  
import axios from "../../api/axios.js";  
import { useParams, useLocation } from 'react-router-dom'; 
import { FaCarSide } from "react-icons/fa6";
import { FaPlane } from "react-icons/fa";
import { TbTrain } from "react-icons/tb";
import { TbBus } from "react-icons/tb"; 
import { FaArrowRight } from "react-icons/fa";
import Travelsnav from '../tourspage/categories_nav.jsx'; 
import Footer from '../tourspage/footer.jsx'; 
import RequestPage from "./requests/requests.jsx" 

const Trips_MainPage = () => {
    const [showmain, setshowmain] = useState(true);
    const [showplanner, setShowplanner] = useState(false);
    const [showQA, setShowQA] = useState(false);   
    const [showrequests, setShowrequests] = useState(false);         

    const handlemain = () => {  
        setshowmain(true);   
        setShowplanner(false);   
        setShowQA(false);  
        setShowrequests(false);  
      };  

      const handleplanner = () => {  
        setshowmain(false);   
        setShowplanner(true);   
        setShowQA(false);  
        setShowrequests(false);  
      };  

      const handleQA = () => {  
        setshowmain(false);   
        setShowplanner(false);   
        setShowQA(true);  
        setShowrequests(false);  
      };  

      const handlerequests = () => {  
        setshowmain(false);   
        setShowplanner(false);   
        setShowQA(false);  
        setShowrequests(true);  
      };  

    const tour = {  
          
            id: 1,  
            name: "Adventure in the Alps",  
            image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixcmQsARbTtwpySN--xqSmWg_p2yTCYv80A&s",  
            description: "Join us for an exhilarating adventure in the breathtaking Alps",  
            travellers: 10,  
            participants: 20,  
            start_place: "Zurich",  
            destination: "Zermatt",  
            start_date: "2024-01-10",  
            end_date: "2024-01-20", 
            transportation : "Plane" 
    }

    const location = useLocation();   
    const user = {  
        profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s',  
        name: 'John Doe',  
        role: 'admin'  
    };  

    const getTransportationIcon = (transportation) => {  
        switch (transportation.toLowerCase()) {  
          case 'train':  
            return <TbTrain className="moveicon-transport"/>;  
          case 'bus':  
            return <TbBus className="moveicon-transport" />;  
          case 'plane':  
            return <FaPlane className="moveicon-transport" />;  
          case 'car':  
            return <FaCarSide className="moveicon-transport"/>;  
          default:  
            return null;  
        }  
      };
     
    
   
    const { tourname } = useParams();  
    const isAdmin = user?.role === 'admin';  

    const [tripData, setTripData] = useState(null);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    useEffect(() => {  
        // let isMounted = true; // We keep track of mounted component  
        const fetchTripData = async () => {  
            if (!tourname) {  
                setError('Tour name is required.');  
                setLoading(false);  
                return;  
            }  
            try {  
                const response = await axios.get(`https://triptide.pythonanywhere.com/travels/single/`, {  
                    headers: {  
                        Authorization: localStorage.getItem("token"),  
                    },   
                    params: { travel_name: tourname }   
                });  
        
                // Only set data if the component is still mounted  
                // if (isMounted) {  
                    setTripData(response.data);  
                // }  
            }   
            catch (err) {  
                
                    if (err.response?.status === 403) {  
                        const is_part = err.response.data.is_part; 
                        setError(`Access forbidden. Is part: ${is_part}`);  
                    } else {  
                        setError(err.response?.data?.detail || 'An error occurred while fetching trip data.');  
                    }  
                 
            }   
            finally {  
                // if (isMounted) {  
                    setLoading(false);  
                // }  
            }  
        };  
    
        fetchTripData();  
    
        // Cleanup function to set isMounted to false when unmounted  
        // return () => {  
        //     isMounted = false;   
        // };  
    }, [tourname]);
    
    return (  
        <div className='trippage'>
                        <Travelsnav/>  

        <div className="main-page">
            <div className="sidebar">  
                <ul className="menu">  
                    <li className={`menu-item  ${showmain ? 'active' : ''}`} onClick={handlemain}>  
                        <TbHomeFilled size={25} className='moveiconMain' />  
                        Main  
                    </li>  
                    {isAdmin && <li className={`menu-item  ${showrequests ? 'active' : ''}`} onClick={handlerequests}><IoMdPersonAdd size={25} className='moveiconadd' /> Requests</li>}  
                    <li className="menu-item"><BsFillChatFill size={22} className='moveiconchat' /> Q&A</li>  
                    <li className="menu-item"><GiCash size={25} /> Planner</li>  
                </ul>  
                <div className="profile">  
                    <img src={user.profilePicture} alt="Profile" className="profile-pic" />  
                    <span className="profile-name">{user.name}</span>  
                </div>  
            </div>  
             
        {showrequests ? (  
            <RequestPage />  
        ) : (  
            showmain && ( 
                <div className="trip-container">  
                        {error && tripData === null ? (  // Display error if tripData is null  
                            <p style={{ color: 'red' }}>{error}</p>  
                        ) : tripData ? ( // Check if tripData is available to render  
                            <> 
                                <div className="trip-header">  
                                    <img   
                                        className="trip-photo"   
                                        src={tripData.travels.travel_is.image_url}   
                                        alt={`Photo of ${tripData.travels.travel_is.name}`}   
                                    />  
                                    <div className="trip-info">  
                                        <h2 className="tour-name">{tripData.travels.travel_is.name}</h2>  
                                        <p className="location">{tripData.travels.travel_is.mode}</p>  
                                        <p className="capacity">{tripData.travels.travel_is.travellers} participants</p>  
                                        <p className="locations">  
                                            {tripData.travels.travel_is.start_place} {getTransportationIcon(tripData.travels.travel_is.transportation)} {tripData.travels.travel_is.destination}  
                                        </p>  
                                        <p className="dates">  
                                            {tripData.travels.travel_is.start_date} <FaArrowRight className='moveicon-transport' /> {tripData.travels.travel_is.end_date}  
                                        </p>  
                                    </div>  
                                </div>  
                                <p className="trip-description-class">{tripData.travels.travel_is.description} </p>  
                            </>  
                        ) : (  
                            <p>Loading...</p> // Optional loading state  
                        )}  
                    </div>  
        )  
    )}  
        
        </div>
        <br />  
        <Footer/>
        </div>  
    );  
};  

export default Trips_MainPage;