import React from 'react';  
import './footer.scss'; // Make sure to import the SCSS file  

const Footer = () => {  
    return (  
<footer class="footer-distributed">

			<div class="footer-left">

				<h3>Trip<span>Tide</span></h3>

				<p class="footer-links">
					<a href="#" class="link-1">Home</a>
					
					<a href="#">Blog</a>
				
					<a href="#">Pricing</a>
				
					<a href="#">About</a>
					
					<a href="#">Faq</a>
					
					<a href="#">Contact</a>
				</p>

				<p class="footer-company-name">Travel safe © 2024</p>
			</div>

			<div class="footer-center">

				<div>
					<i class="footer-company-about"></i>
					<span>Contact us!</span>
				</div>

				<div>
					<i class="fa fa-envelope"></i>
                    <ul>  
                        <li>support@company.com</li>  
                        <li>support@company.com</li>  
                        <li>support@company.com</li>  
                        <li>support@company.com</li>  
                        <li>support@company.com</li>  
                        <li>support@company.com</li>  
                    </ul>  
				</div>

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