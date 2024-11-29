import React from 'react';  
import "./ProfilePage.scss"

const Profile = () => {  
  return (  
    <div className='profile'>  
      <nav className="menu" tabIndex="0">  
        <div className="smartphone-menu-trigger"></div>  
        <header className="avatar">  
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s" alt="John D." />  
          <h2>John D.</h2>  
        </header>  
        <ul>  
          <li tabIndex="0" className="icon-dashboard"><span>My trips</span></li>  
          <li tabIndex="0" className="icon-customers"><span>My rate</span></li>  
          <li tabIndex="0" className="icon-users"><span>Create new trip</span></li>  
          <li tabIndex="0" className="icon-settings"><span>Edit profile</span></li>  
        </ul>  
      </nav>  
      <main>  
        <div className="helper">  
          RESIZE THE WINDOW  
          <span>Breakpoints on 900px and 400px</span>  
        </div>  
      </main>  
    </div>  
  );  
};  

export default Profile;