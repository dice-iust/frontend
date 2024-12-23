import React, { useEffect, useState } from "react";  
import ExpenseUserList from "./Components/ExpenseUserList";
import axios from "axios";  
import AddExpense from "./Components/AddExpense";  
import BalanceList from "./Components/BalanceList"; // Import the new component  
import './BudgetPlanner.scss';  
import PlannerHeader from './Components/PlannerHeader';  

const BudgetPlanner = ({tourname}) => {  
    const [showAddExpense, setShowAddExpense] = useState(false);  
    const [showExpenseList, setShowExpenseList] = useState(true);  
    const [showBalanceList, setShowBalanceList] = useState(false);  

    const [expData, setExpData] = useState([]);  
    const [balances, setBalances] = useState([]); // State for managing balances  
    const [isOpen, setIsOpen] = useState(false);  

    const toggleMenu = () => {  
        setIsOpen(prevState => !prevState);  
    };  

  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);   
  const [data, setData] = useState([]);  
    useEffect(() => {  
        const fetchTripData = async () => {  
            if (!tourname) {  
                setError('Tour name is required.');  
                setLoading(false);  
                return;  
            }  
            try {  
                const response = await axios.get(`https://triptide.liara.run/planner/allpay/`, {  
                    headers: {  
                        Authorization: localStorage.getItem("token"),  
                    },   
                    params: { travel_name: tourname }   
                });  
                setData(response.data.pays || []);  // Ensure valid participants are set  
                // setLoading(false);  // Stop loading after fetching data
                setError("") ; 
            } catch (err) {  
                console.error(err);  
                setLoading(false);  // Stop loading on error  
                if (err.response?.status === 403) {  
                    const is_part = err.response.data.is_part;   
                    setError(`Access forbidden. Is part: ${is_part}`);  
                } else {  
                    setError(err.response?.data?.detail || 'An error occurred while fetching trip data.');  
                }  
            }    
        };  
    
        fetchTripData();   
    }, [tourname]); 
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
                        tourname={tourname}
                    />  
                )}  

            <div className=".expense-list-container1 ">
                {showExpenseList && data.map((item) => (  
                    <ExpenseUserList  
                        payer={item.payer}  
                        title={item.title}  
                        price={item.amount}  
                        id={item.id}  
                        date={item.created_at}  
                        description={item.description}  
                        key={item.id} 
                        cat={item.category_icon} 
                        factorImage={item.receipt_image}
                        setExpData={setExpData}
                        users={item.participants} 
                        tourname={tourname} 
                    />  
                ))}  
                </div>

                {/* Render Balance List when toggled */}  
                {showBalanceList && <BalanceList tourname={tourname}  balances={balances} setBalances={setBalances} />}  
            </div>  
        </div>  
    );  
};  

export default BudgetPlanner;