import axios  from "axios";
import React, { useEffect, useState } from "react";
import { FiInfo } from 'react-icons/fi'; // Ensure this is at the top of your file  
import { useLocation } from 'react-router-dom';  

import { useNavigate } from 'react-router-dom';
import "./send_email.scss"

const EmailSent = () => {
    const location = useLocation();  
    const { email } = location.state || {}; // Destructure to get email, if it exists  

  return (
    <div className="send-email">
        <div className="title-send-email" >
            <span className="key-email trip-sendemail">T</span>
            <span className="key-email trip-sendemail">r</span>
            <span className="key-email trip-sendemail">i</span>
            <span className="key-email trip-sendemail">p</span>
            <span className="key-email tide-sendemail">T</span>
            <span className="key-email tide-sendemail" >i</span>
            <span className="key-email tide-sendemail">d</span>
            <span className="key-email tide-sendemail">e</span>
        </div>
        <div className="box-send-email">
            <a href="/login/forgot" className="back-link">&lt; Back</a> 
            <div className="title-forgot-email">Forgot password</div>
            <div className="sent-image-container"></div>
            <div className="title-forgot-email1">Check your inbox</div>
            <div className="title-forgot-email2">An email will be sent shortly to<br/>
            {email} with<br/>password reset instructions.</div>
            <a href="/login" class="button-send-email" >GOT IT</a>

        </div>
    </div>
    );  
};  

export default EmailSent;