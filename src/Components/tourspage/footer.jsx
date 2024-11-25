import React, { useState } from 'react';  
import './footer.scss';  
import '@fortawesome/fontawesome-free/css/all.min.css';  
import { MdEmail } from "react-icons/md";  
import axios from '../../api/axios';  

const email_url = 'email/';  

const Footer = () => {  
    const [email_all, setEmail] = useState('');  
  
    const handleSubmit = async (e) => {  
        e.preventDefault();  
        
        try {  
            const response = await axios.post(email_url,  
                JSON.stringify({ email_all }),  
                {  
                    headers: { 'Content-Type': 'application/json' },  
                    withCredentials: false  
                }  
            );  
            // Show success alert instead of setting a message state  
            alert('Thank you for subscribing!');  
            setEmail('');   
        } catch (error) {  
            console.error("Error subscribing:", error);  
            alert('There was an error subscribing. Please try again.');  
        }  
    };  

    return (  
        <footer className="footer-distributed">  
            <div className="footer-left">  
                <h3>Trip<span>Tide</span></h3>  
                <p className="footer-links">  
                    <a href="#" className="link-1">About</a>  
                    <a href="#">Profile</a>  
                </p>  
                <p className="footer-company-name">Travel safe © 2024</p>  
                <div className="rounded-social-buttons">  
                    <a className="social-button instagram" href="https://www.instagram.com/triptide2024" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>  
                    <a className="social-button twitter" href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-x-twitter"></i></a>  
                    <a className="social-button youtube" href="https://www.youtube.com/@TripTide2024" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>  
                    <a className="social-button linkedin" href="https://t.me/TripTide_Channel" target="_blank" rel="noopener noreferrer"><i className="fab fa-telegram"></i></a>   
                </div>  
            </div>  
   
            <div className="footer-center">  
                <h4 style={{ color: "white", fontWeight: "bold", fontSize: "24px" }}>Be In Touch with us</h4>  
                <div className='contact'>  
                    <MdEmail className='icon' />  
                    <p style={{ color: "white", fontWeight: "300", textAlign: "left" }}>triptide.contact@gmail.com</p>  
                </div>  
                <p>If you are interested in getting our news, please enter your email</p>  

                <form onSubmit={handleSubmit}>   
                    <input   
                        type="email"   
                        placeholder="Enter Email"   
                        className="footer-email"  
                        value={email_all}  
                        onChange={(e) => setEmail(e.target.value)}  
                        required  
                    />  
                    <button type="submit" className="footer-button">Subscribe</button>  
                </form>  
            </div>  

            <div className="footer-right">  
                <p className="footer-company-about">  
                    <span>About TripTide</span>  
                    Here you can manage your trips and budget! Travel with your friends or find your own group for vacation! You can also be an admin of a group to lead your team to adventure!  
                </p>  
                <div className="footer-icons">  
                </div>  
            </div>  
        </footer>  
    );  
};  

export default Footer;