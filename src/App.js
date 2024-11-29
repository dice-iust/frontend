
import React from 'react';  
import { BrowserRouter as Router, Route, Routes ,Switch} from 'react-router-dom'; // Import Router components  
// import './App.css';  
import LoginForm from "./Components/LoginForm/loginform.jsx";  
import SignupForm from "./Components/SignupForm/SignupForm.jsx";  
import Home from "./Components/LandingPage/Components/Home.jsx";
import TourList from "./Components/tourspage/alltours.jsx";
import About from "./Components/About/about.jsx"
import EditProfile from "./Components/EditProfile/EditProfile.jsx"
import Autumn from "./Components/tourspage/Autumntrips.jsx";
import Summer from "./Components/tourspage/Summertrips.jsx";
import Spring from "./Components/tourspage/Springtrips.jsx";
import Short from "./Components/tourspage/Shorttrips.jsx";
import Upcoming from './Components/tourspage/Upcomintrips.jsx';
import Economical from "./Components/tourspage/Economicaltrips.jsx";
import Fancy from "./Components/tourspage/Fancytrips.jsx";
import Winter from './Components/tourspage/Wintertrips.jsx';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword.jsx';
import ChangePass from './Components/ForgotPassword/change-pass.jsx';
import EmailSent from './Components/ForgotPassword/send_email.jsx';


function App() {  
  return (  
    <Router>  
      <Routes>  
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<LoginForm />} /> 
        <Route path="/signup" element={<SignupForm />} /> 
        <Route path="/Main" element={<TourList />} /> 
        <Route path="/about" element={<About />} /> 
        <Route path="/EditProfile" element={<EditProfile />} /> 
        <Route path="/Main/Autumn" element={<Autumn />} /> 
        <Route path="/Main/Summer" element={<Summer />} /> 
        <Route path="/Main/Spring" element={<Spring />} /> 
        <Route path="/Main/Short" element={<Short />} /> 
        <Route path="/Main/UpComing" element={<Upcoming />} /> 
        <Route path="/Main/Economical" element={<Economical />} /> 
        <Route path="/Main/Fancy" element={<Fancy />} /> 
        <Route path="/Main/Winter" element={<Winter />} />
        <Route path="/login/forgot" element={<ForgotPassword/>}/>
        <Route path="/login/forgot/email_sent" element={<EmailSent/>}/>
        <Route path="/changepass" element={<ChangePass/>}/>
        <Route  path="/password-reset-confirm/:userId/:token" component={ChangePass} /> 
        
      </Routes>  
    </Router>  
  );  
}  



export default App;
