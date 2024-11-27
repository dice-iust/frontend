import axios  from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./ForgotPassword.scss"

const ForgotPassword = () => {
  
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
            <div className="title-forgot3"> Email</div>
       </div>
    </div>
    );  
};  

export default ForgotPassword;