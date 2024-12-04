import React from 'react';  
import './NewExpense.scss'; // Ensure to import your CSS file  
import BudgetPlanner from '../assets/budget-planner.png';  
import tripImg from '../assets/trip_iamge.jpg'; // Ensure this path is correct  
import headerImg from '../assets/photo-back.png';  
import Expenseuserlist from "./ExpenseUserList";

const BudgetPlanner2 = () => {  
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
        <div class="filter-btn">  
          <a id="one" href="#"><i class="ion-ios-checkmark-outline"></i> Balance</a>  
          <a id="two" href="#"><i class="ion-ios-alarm-outline"></i> Expenses</a>  
          <a id="three" href="#"><i class="ion-ios-heart-outline"></i> Add Item</a>  
          <a id="all" href="#"><i class="ion-ios-star-outline"></i> All</a>  
          <span class="toggle-btn ion-android-funnel"></span>  
        </div> 
      <Expenseuserlist/>
      </div>  
    </div>  
  );  
};  

export default BudgetPlanner2;