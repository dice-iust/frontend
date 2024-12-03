import './MyRate.scss';  
import React, { useEffect, useState } from 'react';  
import axios from '../../../api/axios.js'; // Adjust the import path as needed  
import { useNavigate } from 'react-router-dom';  
import { GrMoney } from "react-icons/gr";  
import { FaCarSide } from "react-icons/fa6";  
import { FaPlane } from "react-icons/fa";  
import { TbTrain } from "react-icons/tb";  
import { TbBus } from "react-icons/tb";  
import { FaUndoAlt } from "react-icons/fa";  
import { FaRegCalendar } from "react-icons/fa6"; 
const mytravels_URL = 'mytravels';  

const MyRate = () => {  
    const [rating, setRating] = useState(0); // Initialize state for the rating  
    const [datafuture, setDatafuture] = useState(null);
    useEffect(() => {  
        const fetchRating = async () => {  
            try {  
                // Replace with your actual API endpoint to fetch the rating  
                const response = await axios.get('/path/to/api/rating');   
                setRating(response.data.rating);  // Set the rating from the response  
            } catch (error) {  
                console.error('Error fetching rating:', error);  
            }  
        };  

        fetchRating();  
    }, []); // Run effect only once when component mounts  

    const normalizedRating = Math.min(Math.max(2, 0), 5);  
    useEffect(() => {  
        const fetchData = async () => {  
            try {  
                const response = await axios.get(mytravels_URL, {  
                  headers: { Authorization: localStorage.getItem("token") },  
                });   
                setDatafuture(response.data.future);
                console.log(response.data);  
                console.log(datafuture);
            } catch (error) {  
                console.error("Error fetching data:", error);  
            }  
        };  
        fetchData();  
    }, []);  
  
    const filledStarstrip = Math.min(Math.max(1, 0), 5); 
  
 
  
    return (  
        <div className="rate">
        <div className="container-rate">  
            <div className="box box-small-left">   
                <div className="circle">
                    <div className='circle-in'>
                    {Array.from({ length: 5 }, (_, index) => {  
                        const isFilled = index < Math.floor(normalizedRating); // Fully filled stars  
                        const isHalfFilled = index === Math.floor(normalizedRating) && (normalizedRating % 1) > 0; // Half filled star  
                        return (  
                            <span  
                                className={`star ${isFilled ? 'filled' : ''} ${isHalfFilled ? 'half-filled' : ''}`}  
                                key={index}  
                            />  
                        );  
                    })}   
                    </div>
                </div>
                Left Box  
            </div>  
            <div className="box box-large">   
                <div className="circle"> 
                    <div className="circle-in">  
                    {Array.from({ length: 5 }, (_, index) => {  
                        const isFilled = index < Math.floor(normalizedRating); // Fully filled stars  
                        const isHalfFilled = index === Math.floor(normalizedRating) && (normalizedRating % 1) > 0; // Half filled star  
                        return (  
                            <span  
                                className={`star ${isFilled ? 'filled' : ''} ${isHalfFilled ? 'half-filled' : ''}`}  
                                key={index}  
                            />  
                        );  
                    })}   
                <div className="rating-number">{normalizedRating}</div>  
                </div>  
                </div>
                </div>  
            <div className="box box-small-right">   
                <div className="circle" />   
                Right Box  
            </div>  
        </div>
        <hr width="100%" size="2"/>
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
                                        {/* <div className={`trip-type2 ${tour.travel_is.mode}`}>  
                                            <GrMoney aria-hidden="true" />{" "}  
                                            {tour.travel_is.mode.charAt(0).toUpperCase() + tour.travel_is.mode.slice(1)}  
                                        </div>   */}
                                    </p>  
                                    <div className="tour-details2">  
                                        {/* <p className="tour-route2">  
                                            <span className="tour-text2">{tour.travel_is.start_place} {getTransportationIcon(tour.travel_is.transportation)} {tour.travel_is.destination}</span>  
                                        </p>   */}
                                        <div className="star-rating">  
                                        {[...Array(5)].map((_, index) => (  
                                            <span key={index} className={`fa fa-star ${index < filledStarstrip ? 'checked' : ''}`}></span>  
                                        ))}  
                                        </div>  
                                    </div>  
                                    <div className="tour-meta7">  
                                        {/* <p className="tour-dates2">  
                                            <FaRegCalendar className='moveicon3' />  
                                            <span>{formatDate(tour.travel_is.start_date)}</span>  
                                        </p>  
                                        <p className="tour-length2" style={{ textAlign: "left" }}>  
                                            <FaUndoAlt className='moveicon3' />  
                                            {formatDate(tour.travel_is.end_date)}  
                                        </p>   */}
                                    </div>   
                                </div>  
                            </div>  
                        ))}  
                    </div>  
                ) : (  
                    <p>You have no trips yet!</p>  
                )}    
            </div>       
        </div>
    );  
};  

export default MyRate;