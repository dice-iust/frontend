
import React from 'react';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components  
import './App.css';  
import LoginForm from "./Components/LoginForm/loginform.jsx";  
import SignupForm from "./Components/SignupForm/SignupForm.jsx";  
import Home from "./Components/LandingPage/Components/Home.jsx";
import TourList from "./Components/tourspage/alltours.jsx";
import About from "./Components/About/about.jsx"
function App() {  
  return (  
    <Router>  
      <Routes>  
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<LoginForm />} /> 
        <Route path="/signup" element={<SignupForm />} /> 
        <Route path="/Main" element={<TourList />} /> 
        <Route path="/about" element={<About />} /> 
      </Routes>  
    </Router>  
  );  
}  

export default App;


import React from 'react';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components  
import './App.css';  
import LoginForm from "./Components/LoginForm/loginform.jsx";  
import SignupForm from "./Components/SignupForm/SignupForm.jsx";  
import Home from "./Components/LandingPage/Components/Home.jsx";
import TourList from "./Components/tourspage/alltours.jsx";
import EditProfile from "./Components/EditProfile/EditProfile.jsx"

function App() {  
  return (  
    <Router>  
      <Routes>  
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<LoginForm />} /> 
        <Route path="/signup" element={<SignupForm />} /> 
        <Route path="/Main" element={<TourList />} /> 
        <Route path="/EditProfile" element={<EditProfile />} /> 
      </Routes>  
    </Router>  
  );  
}  

export default App;