import React from 'react';  
import './footer.scss'; // Make sure to import the SCSS file  

const Footer = () => {  
    return (  
        <footer className="footer">  
            <div className="footer__content">  
                <div className="footer__section">  
                    <h3 className="footer__heading">Explore</h3>  
                    <ul className="footer__links">  
                        <li><a href="#destinations">Destinations</a></li>  
                        <li><a href="#tours">Tours</a></li>  
                        <li><a href="#blog">Blog</a></li>  
                        <li><a href="#about">About Us</a></li>  
                    </ul>  
                </div>  
                <div className="footer__section">  
                    <h3 className="footer__heading">Connect</h3>  
                    <ul className="footer__links">  
                        <li><a href="#contact">Contact Us</a></li>  
                        <li><a href="#support">Support</a></li>  
                    </ul>  
                </div>  
                <div className="footer__section">  
                    <h3 className="footer__heading">Follow Us</h3>  
                    <div className="footer__social">  
                        <a href="#facebook" className="footer__social-icon">Facebook</a>  
                        <a href="#twitter" className="footer__social-icon">Twitter</a>  
                        <a href="#instagram" className="footer__social-icon">Instagram</a>  
                    </div>  
                </div>  
            </div>  
            <div className="footer__bottom">  
                <p>&copy; 2024 Travel Agency. All rights reserved.</p>  
            </div>  
        </footer>  
    );  
};  

export default Footer;