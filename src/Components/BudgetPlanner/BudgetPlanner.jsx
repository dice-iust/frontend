import React, { useEffect, useState } from "react";  
import ExpenseUserList from "./Components/ExpenseUserList";  
import AddExpense from "./Components/AddExpense";  
import { expenseData } from "../../api/jsondata/planner";  
import './BudgetPlanner.scss';  
import PlannerHeader from './Components/PlannerHeader';  

const BudgetPlanner = () => {  
  const [showAddExpense, setShowAddExpense] = useState(false);  
  const [showExpenseList, setShowExpenseList] = useState(true);
  const [showBalanceList, setShowBalanceList] = useState(false);  
  
  const [expData, setExpData] = useState([]);  
  const [isOpen, setIsOpen] = useState(false);  

  const toggleMenu = () => {  
    setIsOpen(prevState => !prevState);  
  };  

  useEffect(() => {  
    setExpData(expenseData); // Load the expense data initially  
  }, []);  

  const handleAddExpenseToggle = () => {  
    setShowAddExpense(true);  
    setShowExpenseList(false);  
    setShowBalanceList(false);
    setIsOpen(false); // Close the menu when adding an expense  
  };  

  // This toggles back to the expense list  
  const handleExpenseListToggle = () => {  
    setShowExpenseList(true);  
    setShowAddExpense(false);  
    setShowBalanceList(false);

    setIsOpen(false); // Close the menu when showing the expense list  
  };  

  const handleBalancesToggle = () => {  
    setShowBalanceList(true);
    setShowAddExpense(false);  
    setShowExpenseList(false); // Default to showing the expense list  
    setIsOpen(false);  
  };  

  return (  
    <div className="budget-planner">  
      <div className="planner-box">  
        <PlannerHeader />  
        <div className={`filter-btn ${isOpen ? 'open' : ''}`}>  
          <span className="toggle-btn ion-android-funnel" onClick={toggleMenu}>  
            <div className="dot"></div>  
            <div className="dot"></div>  
            <div className="dot"></div>  
          </span>  
          <a  className="option" onClick={handleAddExpenseToggle}>  
            <i className="fas fa-pencil-alt"></i>  
          </a>  
          <a  className="option" onClick={handleExpenseListToggle}>  
            <i className="fas fa-wallet"></i>  
          </a>  
          <a  className="option" onClick={handleBalancesToggle}>  
          <i class="fas fa-clipboard-check"></i>  
          </a>
        </div>  

        {showAddExpense && (  
          <AddExpense  
            setExpData={setExpData}  
            setShowAddExpense={setShowAddExpense}  
            handleExpenseListToggle={handleExpenseListToggle} // Pass this function down  
          />  
        )}  

        {showExpenseList && expData.map((item) => (  
          <ExpenseUserList  
            username={item.username}  
            title={item.title}  
            price={item.amount}  
            id={item.id}  
            date={item.date}  
            description={item.description}  
            key={item.id}  
            setExpData={setExpData}  
          />  
        ))}  
        {
          showBalanceList
        }
      </div>  
    </div>  
  );  
};  

export default BudgetPlanner;