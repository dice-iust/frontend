import React, { useState } from 'react';  
import './NewExpense.scss'; // Ensure to import your CSS file  
import BudgetPlanner from '../assets/budget-planner.png';  
import tripImg from '../assets/trip_iamge.jpg'; // Ensure this path is correct  
import headerImg from '../assets/photo-back.png';  
import Expenseuserlist from "./ExpenseUserList";

const BudgetPlanner2 = () => {  
  const [isOpen, setIsOpen] = useState(false);  

    const toggleMenu = () => {  
        setIsOpen(!isOpen);  
    }; 
  return (  
    <div className="budget-planner">  
      <div className="planner-box">  
        <div className="planner-image-container">  
          <img src={headerImg} alt="header" className="header-image" />  
        
          <img src={BudgetPlanner} alt="planner" className="planner-image" />  
          
          <div className="trip-title-planner">Summer Trip</div>  
          
          <div className="trip-planner-image-container">  
            <img src={tripImg} alt="trip" className="trip-planner-image" />  
          </div>  
        </div> 
        <div className={`filter-btn ${isOpen ? 'open' : ''}`}>  
            <span className="toggle-btn ion-android-funnel" onClick={toggleMenu}></span>  
            <a href="#" className="option">Balances</a>  
            <a href="#" className="option">add</a>  
            <a href="#" className="option">expense</a>  
        </div> 
      <Expenseuserlist/>
      
      </div>  
     
    </div>  
    
  );  
};  

export default BudgetPlanner2;