import './MyRate.scss';  
import React, { useEffect, useState } from 'react';  
import axios from '../../../api/axios.js'; // Adjust the import path as needed   
import goodPayImg from '../Assests/goodpay.png'; // Assuming correct path for the image  
import OverallImg from '../Assests/overall.png'; // Assuming correct path for the image 
import wellTraveled from '../Assests/welltravel.png' 


const MyRate = () => {  
    const [rating, setRating] = useState(0);   
    const [rating_good_payed, setRating_good_payed] = useState(0);  
    const [rating_well_travelled, setRating_well_travelled] = useState(0);  

    useEffect(() => {  
        const fetchRating = async () => {  
            try {  
                const response = await axios.get('/path/to/api/rating');   
                setRating(response.data.rating);  
                setRating_good_payed(response.data.rating);  
                setRating_well_travelled(response.data.rating);  
            } catch (error) {  
                console.error('Error fetching rating:', error);  
            }  
        };  

        fetchRating();  
    }, []);  

    const normalizedRating_overall = Math.min(Math.max(2, 0), 5);   
    const normalizedRating_well_traveled = Math.min(Math.max(1, 0), 5);  
    const normalizedRating_good_payed = Math.min(Math.max(3, 0), 5);  

    return (  
        <div className="rate">  
            <div className="container-rate">  
                {/* Left box */}  
                <div className="box box-small">   
                    <div className="circle">  
                        <div className='circle-in'>  
                            {Array.from({ length: 5 }, (_, index) => {  
                                const isFilled = index < Math.floor(normalizedRating_good_payed);   
                                const isHalfFilled = index === Math.floor(normalizedRating_good_payed) && (normalizedRating_good_payed % 1) > 0;   
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
                        <img src={goodPayImg} alt="Good Payer" className="rate-image" />  
                    </div>            
                </div>  
                
                {/* Center box */}  
                <div className="box box-large">   
                    <div className="circle">   
                        <div className="circle-in">  
                            {Array.from({ length: 5 }, (_, index) => {  
                                const isFilled = index < Math.floor(normalizedRating_overall);   
                                const isHalfFilled = index === Math.floor(normalizedRating_overall) && (normalizedRating_overall % 1) > 0;   
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
                        <img src={OverallImg} alt="Good Payer" className="rate-image" />  
                    </div> 
                </div>  
                
                {/* Right box */}  
                <div className="box box-small">   
                    <div className="circle">  
                        <div className="circle-in">  
                            {Array.from({ length: 5 }, (_, index) => {  
                                const isFilled = index < Math.floor(normalizedRating_well_traveled);   
                                const isHalfFilled = index === Math.floor(normalizedRating_well_traveled) && (normalizedRating_well_traveled % 1) > 0;   
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
                        <img src={wellTraveled} alt="Good Payer" className="rate-image" />  
                    </div>  
                </div>  
            </div>  
            <br/>
            <hr width="100%" size="2"/>  
        </div>  
    );  
};  

export default MyRate; 