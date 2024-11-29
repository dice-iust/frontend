import React from 'react';  
import "./ProfilePage.scss";  

const Profile = () => {  
  return (  
    <div className="profile-page">  
      <nav className="sidebar-menu" tabIndex="0">  
        <div className="smartphone-menu-trigger" aria-label="Menu Trigger"></div>  
        <header className="avatar">  
          <img   
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"   
            alt="Profile of John D."   
            className="avatar-image"   
          />  
          <h2>John D.</h2>  
        </header>  
        <ul aria-label="Main Navigation Menu">  
          <li tabIndex="0" className="icon-dashboard" role="menuitem"><span>My Trips</span></li>  
          <li tabIndex="0" className="icon-settings" role="menuitem"><span>My Rate</span></li>  
          <li tabIndex="0" className="icon-customers" role="menuitem"><span>Edit Profile</span></li>  
          <li tabIndex="0" className="icon-users" role="menuitem"><span>Create Trip</span></li>  
        </ul>  
      </nav>  
      <main>  
        <div className="helper">  
          <h1>Profile Overview</h1>  
          <p>RESIZE THE WINDOW</p>  
          <span>Breakpoints at 900px and 400px</span>  
        </div>  
      </main>  
    </div>  
  );  
};  

export default Profile;