
import React from 'react';  
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components  
import './App.css';  
// import LoginForm from "./Components/LoginForm/loginform.jsx";  
// import SignupForm from "./Components/SignupForm/SignupForm.jsx";  
// import Home from "./Components/LandingPage/Components/Home.js";
import TourList from "./Components/tourspage/alltours.jsx";
import Upcoming from "./Components/tourspage/Upcomintrips.jsx";
function App() {  
  return (  
    <div className="App">  
      <TourList />  
      {/* <Upcoming/> */}
    </div>  
    // <Router>  
    //   <Routes>  
    //     <Route path="/" element={<Home />} /> 
    //     <Route path="/login" element={<LoginForm />} /> 
    //     <Route path="/signup" element={<SignupForm />} /> 
    //   </Routes>  
    // </Router>  
  );  
}  

export default App;