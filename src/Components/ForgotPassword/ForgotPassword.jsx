import axios  from "axios";
import React, { useEffect, useState } from "react";
import { FiInfo } from 'react-icons/fi'; // Ensure this is at the top of your file  

import { useNavigate } from 'react-router-dom';
import "./ForgotPassword.scss"

const ForgotPassword = () => {
    const [email, setEmail] = useState('');  
    const [error, setError] = useState('');  

    const validateEmail = (email) => {  
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex validation  
        return regex.test(email);  
    };  

    const handleChange = (e) => {  
        setEmail(e.target.value);   
        setError(''); 
        
    };    
    const handleResetPassword = () => {  
        // Only validate and show error if the email is not valid  
        if (!validateEmail(email)) {  
            setError('Invalid email. Please enter email as name@email.com');  
            // setSuccessMessage(''); // Clear success message if there's an error  
            return; // Stop execution of the function  
        }
      }  ;
  return (
    <div className="forgot">
        <div className="title-forgots" >
            <span className="key">T</span>
            <span className="key">r</span>
            <span className="key">i</span>
            <span className="key">p</span>
            <span className="key">T</span>
            <span className="key">i</span>
            <span className="key">d</span>
            <span className="key">e</span>
        </div>
        <div className="box">
            <div className="title-forgot1">Forgot password</div>
            <div className="title-forgot2">Enter the email address you use on TripTide.We'll 
                <br/>send you a link to reset your password.</div>
            <div className="container-forgot">  
            {error && <div className="error-message"><FiInfo className="moveaicon-forgot"/>{error}</div>}
                <label className="email-text">Email</label>  
                <div className="input-box-forgot">
                <input  
                    name="email"  
                    placeholder="name@email.com"  
                    type="email"  
                    required=""  
                    aria-label="Email"  
                    value={email}  
                    onChange={handleChange}  
                    className="input-forgot"  />
                </div>
                <a href="#" class="button-forgot" onClick={handleResetPassword}>Reset Password</a>
            </div> 
            <div className="container-forgot2">
                <label className="back-text">Back to</label>
                <a href="/login" className="login-link">Login</a> 
            </div>
        </div>
    </div>
    );  
};  

export default ForgotPassword;