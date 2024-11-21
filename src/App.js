
import React from 'react';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components  
// import './App.css';  
import LoginForm from "./Components/LoginForm/loginform.jsx";  
import SignupForm from "./Components/SignupForm/SignupForm.jsx";  
import Home from "./Components/LandingPage/Components/Home.jsx";
import TourList from "./Components/tourspage/alltours.jsx";
function App() {  
  return (  
    <Router>  
      <Routes>  
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<LoginForm />} /> 
        <Route path="/signup" element={<SignupForm />} /> 
        <Route path="/Main" element={<TourList />} /> 
        <Route path="/Main/Autumn" element={<TourList />} /> 
        <Route path="/Main/Summer" element={<TourList />} /> 
        <Route path="/Main/Spring" element={<TourList />} /> 
        <Route path="/Main/Short" element={<TourList />} /> 
        <Route path="/Main/UpComing" element={<TourList />} /> 
        <Route path="/Main/Economical" element={<TourList />} /> 
        <Route path="/Main/Fancy" element={<TourList />} /> 
        <Route path="/Main/Winter" element={<TourList />} /> 

      </Routes>  
    </Router>  
  );  
}  

export default App;
