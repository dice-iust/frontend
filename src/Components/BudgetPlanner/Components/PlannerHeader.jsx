import React, { useState } from 'react';  
import './PlannerHeader.scss'; // Ensure to import your CSS file  
import BudgetPlanner from '../assets/budget-planner.png';  
import tripImg from '../assets/trip_iamge.jpg'; // Ensure this path is correct  
import headerImg from '../assets/photo-back.png';  
import Expenseuserlist from "./ExpenseUserList";

const BudgetPlanner2 = () => {  
  
  return (    
      <div className="planner-header">  
        <div className="planner-image-container">  
          <img src={headerImg} alt="header" className="header-image" />  
        
          
          <div className="trip-title-planner">Summer Trip</div>  
          
          <div className="trip-planner-image-container">  
            <img src={tripImg} alt="trip"  />  
          </div>  
        </div> 
        
    </div>  
    
  );  
};  

export default BudgetPlanner2;