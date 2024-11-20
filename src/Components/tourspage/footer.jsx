import React from 'react';  
import './footer.scss'; // Make sure to import the SCSS file  

const Footer = () => {  
    return (  
<footer class="footer-distributed">

			<div class="footer-left">

				<h3>Trip<span>Tide</span></h3>

				<p class="footer-links">
					<a href="#" class="link-1">Home</a>
					
					<a href="#">About</a>
				
					<a href="#">Login</a>
				
					<a href="#">Signup</a>
					
					<a href="#">Profile</a>
				</p>

				<p class="footer-company-name">Travel safe © 2024</p>
			</div>

			<div class="footer-center">
            <h4>Be In Touch with us</h4>  
                <p>We will send you our news!</p>  
                <input type="email" placeholder="Your Email" className="footer-email" required />  
                <button type="submit" className="footer-button">Subscribe</button> 

			</div>

			<div class="footer-right">

				<p class="footer-company-about">
					<span>About TripTide</span>
					Here you can manage your trips and budget! Travel with your friends or you van find your own group to go on vacation!
				</p>

				<div class="footer-icons">

                    

			</div>

			</div>

		</footer>
        
    );  
};  

export default Footer;