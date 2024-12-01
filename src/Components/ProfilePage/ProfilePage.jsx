import React from 'react';  
import "./ProfilePage.scss";  
import Travelsnav from "../tourspage/categories_nav.jsx";  
import Footer from '../tourspage/footer.jsx';  

const Profile = () => {  
  return (  
    <div className='ProfilePage'>  
      <Travelsnav/>      
      <div className='profile-page'>  
        <nav className="menu" tabIndex="0">  
          <div className="smartphone-menu-trigger"></div>  
          <header className="avatar">  
            <img   
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"   
              alt="Profile of John D."   
              className="avatar-image"   
            />  
            <h2>John D.</h2>  
          </header>  
          <ul>  
            <li tabIndex="0" className="icon-dashboard"><span>My trips</span></li>  
            <li tabIndex="0" className="icon-customers"><span>My rate</span></li>  
            <li tabIndex="0" className="icon-users"><span>Create new trip</span></li>  
            <li tabIndex="0" className="icon-settings"><span>Edit profile</span></li>  
          </ul>  
        </nav>  
        <main className="content">  
          <div className="helper">  
            <h1>Profile Overview</h1>  
            <p>RESIZE THE WINDOW</p>  
            <span>Breakpoints at 900px and 400px</span>  
          </div>  
        </main>  
      </div>  
      <Footer/>  
    </div>  
  );  
};  

export default Profile;