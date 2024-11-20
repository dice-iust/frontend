import React from 'react';  
import './footer.scss'; // Make sure to import the SCSS file  

const Footer = () => {  
    return (  
 
<footer class="footer">  
    <div class="footer-content">  
        <div class="footer-left">  
            <h3>Site Name</h3>  
            <img src=".\Assests\logo.png" alt="Logo" class="footer-logo"/> 
            <p class="footer-links">  
                <a href="#">Home</a>  
                <a href="#">Login</a>  
                <a href="#">Sign Up</a>  
                <a href="#">Categories</a>  
            </p>  
        </div>  

        <div class="footer-right">  
            <h4>Be in Touch with Us!</h4>  
            <form action="#">  
                <input type="email" placeholder="Your Email" class="footer-email" required/>  
                <button type="submit" class="footer-button">Subscribe</button>  
            </form>  
        </div>  
    </div>  
</footer>
        
    );  
};  

export default Footer;