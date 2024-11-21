import React from 'react';  
import './footer.scss'; // Ensure this file is correct  
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome if using npm  
import { MdEmail } from "react-icons/md";
import { useState } from 'react'; 

const Footer = () => {  
	// const [email, setEmail] = useState('');

	const handleSubmit = async (e) => {  
		e.preventDefault();  
	
		// try {  
		//   const response = await axios.post(SIGN_URL,  
		// 	JSON.stringify({ user_name: username, email, password,confirmPassword: confirm }),  
		// 	{  
		// 	  headers: { 'Content-Type': 'application/json' },  
		// 	  withCredentials: false  
		// 	}  
		//   );  
	
		//   const accessToken = response?.data?.accessToken;   
		//   setUsername('');  
		//   setPassword('');  
		//   setEmail('');  
		//   setConfirm('');
		//   navigate('/login');  
		// }   
		// catch (err) {  
		//   if (!err?.response) {  
		// 	setErrMsg('An error occurred');  
		//   } else if (username && password &&err.response?.status === 400) {  
		// 	setErrMsg('This Username or Email is already existed');  
		//   } else if (err.response?.status === 401) {  
		// 	setErrMsg('You do not have an account');  
		//   } else {  
		// 	setErrMsg('Please fill out all required fields!');  
		//   }  
		//   if (errRef.current) {  
		// 	errRef.current.focus();  
		//   }  
		// }  
	};
    return (  
        <footer className="footer-distributed">  
            <div className="footer-left">  
                <h3>Trip<span>Tide</span></h3>  
                <p className="footer-links">  
                    <a href="#" className="link-1">Home</a>  
                    <a href="#">About</a>  
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
 
			<div class="footer-center">
			<h4>Be In Touch with us</h4>  
			<p style={{color:"white" , fontWeight :"400"}}>If there is any questions feel free to ask!</p>	
			<div className='contact'>
			<MdEmail className='icon'/><p style={{color:"white" , fontWeight :"300",textAlign:"left"}}> triptide.contact@gmail.com</p>
			</div>
			<p>We will send you our news!</p>  
			<input type="email" placeholder="Enter Email" class="footer-email" 
			    // value={email}   
				// onChange={(e) => setEmail(e.target.value)}
			required />  
			<button type="submit" class="footer-button" onSubmit={handleSubmit}>Subscribe</button>  
		</div>


            <div className="footer-right">  
                <p className="footer-company-about">  
                    <span>About TripTide</span>  
                    Here you can manage your trips and budget! Travel with your friends or find your own group for vacation! You can also be an admin of a group to lead your team to adventure!  
                </p>  
                <div className="footer-icons">  
                    {/* You can add any other icons here if needed */}  
                </div>  
            </div>  
        </footer>  
    );  
};  

export default Footer;