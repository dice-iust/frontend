import React, { useEffect, useState } from "react";  
import ExpenseUserList from "./Components/ExpenseUserList";  
import AddExpense from "./Components/AddExpense";  
import BalanceList from "./Components/BalanceList"; // Import the new component  
import { expenseData } from "../../api/jsondata/planner";  
import './BudgetPlanner.scss';  
import PlannerHeader from './Components/PlannerHeader';  

const BudgetPlanner = () => {  
    const [showAddExpense, setShowAddExpense] = useState(false);  
    const [showExpenseList, setShowExpenseList] = useState(true);  
    const [showBalanceList, setShowBalanceList] = useState(false);  

    const [expData, setExpData] = useState([]);  
    const [balances, setBalances] = useState([]); // State for managing balances  
    const [isOpen, setIsOpen] = useState(false);  

    const toggleMenu = () => {  
        setIsOpen(prevState => !prevState);  
    };  

  //   const fetchExpenses = async () => {  
  //     try {  
  //         const response = await axios.get("https://pythonanywhere.com/planner/allpay/", {  
  //             headers: {  
  //                 'Content-Type': 'application/json',  
  //                 'Authorization': localStorage.getItem("token"), // Set your token here  
  //                 'travel_name': travelName // Send travel_name  
  //             },  
  //         });  

  //         const expenses = response.data.pays.map(pay => ({  
  //             title: pay.title,  
  //             username: pay.created_by.username,  
  //             description: pay.description,  
  //             amount: pay.amount,  
  //             date: new Date().toISOString(),   
  //             id: Math.random() // or another unique ID logic  
  //         }));  
  //         setExpData(expenses);  
  //     } catch (error) {  
  //         console.error('Error fetching expenses:', error);  
  //     }  
  // };  

  // // Function to post a new expense  
  // const postExpense = async (newExpense) => {  
  //     try {  
  //         await axios.post("https://pythonanywhere.com/planner/addpay/", newExpense, {  
  //             headers: {  
  //                 'Content-Type': 'application/json',  
  //                 'Authorization': localStorage.getItem("token"),  
  //                 'travel_name': travelName, // Pass travel name again if needed  
  //             },  
  //         });  

  //         // After posting, fetch updated expenses  
  //         fetchExpenses(); // Retrieve the updated expense list  
  //         setShowAddExpense(false); // Close add expense form  
  //     } catch (error) {  
  //         console.error('Error posting expense:', error);  
  //     }  
  // };  

    useEffect(() => {  
        setExpData(expenseData); // Load the expense data initially  
        
      
        setBalances([  
            { id: 1, name: 'John Doe', amount: 50, type: 'owing' }, // Owed to  
            { id: 2, name: 'Jane Smith', amount: 30, type: 'toReceive' } // Should receive  
        ]);  
    }, []);  
    useEffect(() => {  
      // Save expData to local storage whenever it changes  
      localStorage.setItem('expenses', JSON.stringify(expData));  
  }, [expData]);  

    const handleAddExpenseToggle = () => {  
        setShowAddExpense(true);  
        setShowExpenseList(false);  
        setShowBalanceList(false);  
        setIsOpen(false);   
    };  

    const handleExpenseListToggle = () => {  
        setShowExpenseList(true);  
        setShowAddExpense(false);  
        setShowBalanceList(false);  
        setIsOpen(false);  
    };  

    const handleBalancesToggle = () => {  
        setShowBalanceList(true);  
        setShowAddExpense(false);  
        setShowExpenseList(false);   
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
                    <a className="option" onClick={handleAddExpenseToggle}>  
                        <i className="fas fa-pencil-alt"></i>  
                    </a>  
                    <a className="option" onClick={handleExpenseListToggle}>  
                        <i className="fas fa-wallet"></i>  
                    </a>  
                    <a className="option" onClick={handleBalancesToggle}>  
                        <i className="fas fa-clipboard-check"></i>  
                    </a>  
                </div>  

                {showAddExpense && (  
                    <AddExpense  
                        setExpData={setExpData}  
                        setShowAddExpense={setShowAddExpense}  
                        handleExpenseListToggle={handleExpenseListToggle}  
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

                {/* Render Balance List when toggled */}  
                {showBalanceList && <BalanceList balances={balances} setBalances={setBalances} />}  
            </div>  
        </div>  
    );  
};  

export default BudgetPlanner;