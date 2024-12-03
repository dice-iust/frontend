import './MyRate.scss';  
import React, { useEffect, useState } from 'react';  
import axios from '../../../api/axios.js'; // Adjust the import path as needed  

const MyRate = () => {  
    const [rating, setRating] = useState(0); // Initialize state for the rating  

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

    // Clamp rating between 0 and 5 (ensure it's valid)  
    const normalizedRating = Math.min(Math.max(2, 0), 5);  

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
   
        </div>
    );  
};  

export default MyRate;