import axios from "axios";  
import React, { useState } from "react";  
import { FiInfo } from 'react-icons/fi';  
import { useNavigate } from 'react-router-dom';  
import "./ForgotPassword.scss";  

const ForgotPassword = () => {  
    const [email, setEmail] = useState('');  
    const [error, setError] = useState('');  
    const navigate = useNavigate();  

    const validateEmail = (email) => {  
        // This regex checks that the email has a structure like "something@something.com"  
        const regex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;  // Allows .com, .net, .org, etc.   
        return regex.test(email);  
    };    

    const handleChange = (e) => {  
        setEmail(e.target.value);   
        setError(''); // Clear any previous error when user starts typing  
    };    

    const handleResetPassword = (e) => {  
        e.preventDefault();  

        // Validate email  
        if (!validateEmail(email)) {  
            setError('Invalid email. Please enter email as name@email.com');  
            return; // Stop execution if the email is invalid  
        }  

        // Send POST request to your backend  
        axios.post('https://triptide.pythonanywhere.com/forgot-password/', { email })   
            .then(response => {  
                // Assuming the response is successful, navigate to email_sent page  
                navigate('/login/forgot/email_sent', { state: { email } });  
            })  
            .catch(err => {  
                setError('There is no account registered with this email.Edit your email.');  
            });  
    };  

    return (  
        <div className="forgot">  
            <div className="title-forgots">  
                <span className="key trip-forgot">T</span>  
                <span className="key trip-forgot">r</span>  
                <span className="key trip-forgot">i</span>  
                <span className="key trip-forgot">p</span>  
                <span className="key tide-forgot">T</span>  
                <span className="key tide-forgot">i</span>  
                <span className="key tide-forgot">d</span>  
                <span className="key tide-forgot">e</span>  
            </div>  
            <div className="box-forgot">  
                <div className="title-forgot1">Forgot password</div>  
                <div className="title-forgot2">  
                    Enter the email address you use on TripTide. We'll   
                    <br/>send you a link to reset your password.  
                </div>  
                <div className="container-forgot">  
                    {error && <div className="error-message"><FiInfo className="moveaicon-forgot"/>{error}</div>}  
                    <label className="email-text">Email</label>  
                    <div className="input-box-forgot">  
                        <input  
                            name="email"  
                            placeholder="name@email.com"  
                            type="email"  
                              
                            aria-label="Email"  
                            value={email}  
                            onChange={handleChange}  
                            className="input-forgot"   
                        />  
                    </div>  
                    <button type="button" className="button-forgot" onClick={handleResetPassword}>Reset Password</button>  
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