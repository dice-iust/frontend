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

const myrate_URL = 'travels/myrate/';  
const mytravels_URL = 'mytravels';   
const overall_rate ='rate';  

const MyRate = () => {  
    const [rating, setRating] = useState(0);   
    const [datafuture, setDatafuture] = useState(null);  
    const [dataphoto, setDataphoto] = useState(null);  
    const [rating_good_payed, setRating_good_payed] = useState(0);  
    const [rating_well_travelled, setRating_well_travelled] = useState(0);  
    const [Goodpayphoto,setGoodpayphoto]=useState(null);  
    const [Welltravelphoto,setWelltravelphoto]=useState(null);  
    const [Overallphoto,setOverallphoto]=useState(null);  


    useEffect(() => {  
        const fetchRating = async () => {  
            try {  
                const response = await axios.get(overall_rate, {  
                    headers: { Authorization: localStorage.getItem("token") },  
                  });     
                setRating(Math.round(response.data.total));  // Round the rating  
                setRating_good_payed(Math.round(response.data.total_money));  // Round the good pay rating  
                setRating_well_travelled(Math.round(response.data.total_sleep));  // Round the well traveled rating  
            } catch (error) {  
                console.error('Error fetching rating:', error);  
            }  
        };  

        fetchRating();  
    }, []);  

    useEffect(() => {  
        const fetchRating_photo = async () => {  
            try {  
                const response = await axios.get(myrate_URL, {  
                    headers: { Authorization: localStorage.getItem("token") },  
                  });   
                setGoodpayphoto(response.data.Goodpay);  
                setWelltravelphoto(response.data.Welltravel);  
                setOverallphoto(response.data.Overall);  
            } catch (error) {  
                console.error('Error fetching rating:', error);  
            }  
        };  

        fetchRating_photo();  
    }, []);  

    useEffect(() => {  
        const fetchData = async () => {  
            try {  
                const response = await axios.get(myrate_URL, {  
                  headers: { Authorization: localStorage.getItem("token") },  
                });   
                setDatafuture(Object.values(response.data.rates));  
            } catch (error) {  
                console.error("Error fetching data:", error);  
            }  
        };  
        fetchData();  
    }, []);  

    useEffect(() => {  
        const fetchData_photo = async () => {  
            try {  
                const response = await axios.get(mytravels_URL, {  
                  headers: { Authorization: localStorage.getItem("token") },  
                });   
                setDataphoto(response.data.photo);  
            } catch (error) {  
                console.error("Error fetching data:", error);  
            }  
        };  
        fetchData_photo();  
    }, []);   

    const roundRating = (x) => {  
        if (Number.isInteger(x)) {  
            return x; // Return unchanged if it is an integer  
        }  
    
        // Calculate the integer part  
        const intPart = Math.floor(x); // Get the integer part of x  
    
        // Determine whether to round to x + 0.5 or to x + 1  
        if (x >= intPart + 0.5) {  
            return intPart + 1; // Round up to x + 1  
        } else {  
            return intPart + 0.5; // Round down to x + 0.5  
        }   
    };
    const roundedRating = roundRating(rating);
    const roundedRating_well_traveled = roundRating(rating_well_travelled)
    const roundedRating_good_payed = roundRating(rating_good_payed)  
    const normalizedRating_overall = Math.min(Math.max(roundedRating, 0), 5); // Ensure it's between 0 and   
    const normalizedRating_well_traveled = Math.min(Math.max(roundedRating_well_traveled, 0), 5);  
    const normalizedRating_good_payed = Math.min(Math.max(roundedRating_good_payed, 0), 5);  

    return (  
        <div className="rate">  
            <div className="container-rate">  
                {/* Left box */}  
                <div className="box box-small">   
                    <div className="circle">  
                        <div className='circle-in'>  
                            {Array.from({ length: 5 }, (_, index) => {  
                                const isFilled = index < Math.floor(normalizedRating_good_payed);   
                                const isHalfFilled = index === Math.floor(normalizedRating_good_payed) && (normalizedRating_good_payed % 1) >0;   
                                return (  
                                    <span  
                                        className={`star ${isFilled ? 'filled' : ''} ${isHalfFilled ? 'half-filled' : ''}`}  
                                        key={index}  
                                    />  
                                );  
                            })}   
                            <div className="rating-number">{normalizedRating_good_payed}</div>  
                        </div>  
                    </div>  
                    <div className="rate-title">Good-Payed</div>  

                    {/* Image container moved inside the box div for correct placement */}  
                    <div className="rate-image-container">  
                        <img src={Goodpayphoto} alt="Good Payer" className="rate-image" />  
                    </div>            
                </div>  
                
                {/* Center box */}  
                <div className="box box-large">   
                    <div className="circle">   
                        <div className="circle-in">  
                            {Array.from({ length: 5 }, (_, index) => {  
                                const isFilled = index < Math.floor(normalizedRating_overall);   
                                const isHalfFilled = index === Math.floor(normalizedRating_overall) && (normalizedRating_overall % 1) >0;   
                                return (  
                                    <span  
                                        className={`star ${isFilled ? 'filled' : ''} ${isHalfFilled ? 'half-filled' : ''}`}  
                                        key={index}  
                                    />  
                                );  
                            })}   
                            <div className="rating-number">{normalizedRating_overall}</div>  
                        </div>   
                    </div>  
                    <div className="rate-title">Overall</div>  
                    <div className="rate-image-container">  
                        <img src={Overallphoto} alt="Overall rating" className="rate-image" />  
                    </div>   
                </div>  
                
                {/* Right box */}  
                <div className="box box-small">   
                    <div className="circle">  
                        <div className="circle-in">  
                            {Array.from({ length: 5 }, (_, index) => {  
                                const isFilled = index < Math.floor(normalizedRating_well_traveled);   
                                const isHalfFilled = index === Math.floor(normalizedRating_well_traveled) && (normalizedRating_well_traveled % 1)>= 0.5;   
                                return (  
                                    <span  
                                        className={`star ${isFilled ? 'filled' : ''} ${isHalfFilled ? 'half-filled' : ''}`}  
                                        key={index}  
                                    />  
                                );  
                            })}   
                            <div className="rating-number">{normalizedRating_well_traveled}</div>  
                        </div>     
                    </div>   
                    <div className="rate-title">Well-Traveled</div>  
                    <div className="rate-image-container">  
                        <img src={Welltravelphoto} alt="Well-Traveled rating" className="rate-image" />  
                    </div>  
                </div>  
            </div>  
            <hr width="100%" size="2"/>  
            <br/>  
            <h2 style={{color:"#22487a",textAlign:"center"}}>Your rate in each trip</h2>  
            <br/>    
            <div className="tour-list-container2-rate">  
                {datafuture && datafuture.length >= 1 ? (  
                    <div className="tour-list2">  
                        {datafuture.map((tour) => (  
                            <div key={tour.travel_is.Id} className="tour-card2">  
                                <div className="tour-image-container2">  
                                    <img  
                                        src={tour.travel_is.image_url}  
                                        alt={`Image of ${tour.travel_is.name}`}  
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
                                        <span className="tour-name2" style={{fontSize:"20px",fontWeight:"bold"}}>{tour.travel_is.name}</span>  
                                    </p>  
                                    <div className="tour-details2">  
                                        <p className="tour-route2" style={{marginTop:"9px",marginRight:"16px",fontSize:"16px",fontWeight:"bold",color:"#22487a"}}>  
                                            Well-Travel rate :    
                                        </p>  
                                        <div className="star-rating">  
                                        {[...Array(5)].map((_, index) => {  
                                            const rating = Math.min(Math.max(tour.rates.sleep_rate, 0), 5);  
                                            const filledStars = Math.floor(rating); // whole stars  
                                            const halfStar = rating - filledStars >= 0.5; // check if there's a half star  

                                            return (  
                                                <span key={index} className={`fa fa-star ${index < filledStars ? 'checked' : (halfStar && index === filledStars ? 'half-checked' : '')}`}></span>  
                                            );  
                                        })}  
                                        </div>  
                                    </div>  
                                    <div className="tour-details2">  
                                        <p className="tour-route2" style={{marginTop:"9px",marginRight:"30px",fontSize:"16px",fontWeight:"bold",color:"#22487a"}}>  
                                            Good-Pay rate :    
                                             </p>  
                                        <div className="star-rating">  
                                        {[...Array(5)].map((_, index) => {  
                                            const rating = Math.min(Math.max(tour.rates.money_rate, 0), 5);  
                                            const filledStars = Math.floor(rating); // whole stars  
                                            const halfStar = rating - filledStars >= 0.5; // check if there's a half star  

                                            return (  
                                                <span key={index} className={`fa fa-star ${index < filledStars ? 'checked' : (halfStar && index === filledStars ? 'half-checked' : '')}`}></span>  
                                            );  
                                        })}   
                                        </div> 
                                        
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
    );  
};  

export default MyRate;