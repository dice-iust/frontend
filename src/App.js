
import React from 'react';  
import { BrowserRouter as Router, Route, Routes ,Switch} from 'react-router-dom'; // Import Router components  
// import './App.css';  
import LoginForm from "./Components/LoginForm/loginform.jsx";  
import SignupForm from "./Components/SignupForm/SignupForm.jsx";  
import Home from "./Components/LandingPage/Components/Home.jsx";
import TourList from "./Components/tourspage/alltours.jsx";
import About from "./Components/About/about.jsx"
import EditProfile from "./Components/EditProfile/EditProfile.jsx"
import Autumn from "./Components/tourspage/categories/Autumntrips.jsx";
import Summer from "./Components/tourspage/categories/Summertrips.jsx";
import Spring from "./Components/tourspage/categories/Springtrips.jsx";
import Short from "./Components/tourspage/categories/Shorttrips.jsx";
import Upcoming from './Components/tourspage/categories/Upcomintrips.jsx';
import Economical from "./Components/tourspage/categories/Economicaltrips.jsx";
import Fancy from "./Components/tourspage/categories/Fancytrips.jsx";
import Winter from './Components/tourspage/categories/Wintertrips.jsx';
import EmailVerification from './Components/SignupForm/EmailVerification.jsx';
import Profile from "./Components/ProfilePage/ProfilePage.jsx";
import ForgotPassword from './Components/ForgotPassword/ForgotPassword.jsx';
import AddNewTrip from './Components/AddNewTrip/AddNewTrip.jsx';
import BudgetPlanner from './Components/BudgetPlanner/BudgetPlanner.jsx';


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
        <Route path="/signup/email_verification" element={<EmailVerification/>} />
        <Route path="/login" element={<LoginForm />} /> 
        <Route path="/Profile" element={<Profile />} /> 
        <Route path="/login/forgot" element={<ForgotPassword/>}/>
        <Route path="/budgetplanner" element={<BudgetPlanner/>} />

        <Route path="/addTrip" element={<AddNewTrip />}/>
      </Routes>  
    </Router>  
  );  
}  



export default App;
