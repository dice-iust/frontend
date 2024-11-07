// App.js  
import React from 'react';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components  
import './App.css';  
import LoginForm from "./Components/LoginForm/loginform.jsx";  
import SignupForm from "./Components/SignupForm/SignupForm.jsx";  

function App() {  
  return (  
    <Router>  
      <Routes>  
        <Route path="/login" element={<LoginForm />} /> 
        <Route path="/signup" element={<SignupForm />} /> 
      </Routes>  
    </Router>  
  );  
}  

export default App;