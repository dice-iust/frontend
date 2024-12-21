import React, { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';  
import axios from 'axios';  // Don't forget to import axios if you haven't done so  
import './BalanceList.scss';  

const BalanceList = ({ balances, setBalances, balance_debt, debt, tourname }) => {  
    const handleMarkAsPaid = (id) => {  
        setBalances((prev) => prev.filter(item => item.id !== id));  
    };  

    const TourList = () => {   
        const [activeTab, setActiveTab] = useState("Debts");   
        const [dataphoto, setdataphoto] = useState("");  
        const [debts, setDebts] = useState([]); // For debts  
        const [receivables, setReceivables] = useState([]); // For receivables  
        const [pastPayments, setPastPayments] = useState([]); // For past payments  
        const [loading, setLoading] = useState(true);  
        const [error, setError] = useState(null);   
        const[data,setdata]=useState(false);
        const navigate = useNavigate();   
        
        const openCity = (cityName) => {  
            setActiveTab(cityName);  
        };  

        useEffect(() => {  
            const fetchTripData = async () => {  
                if (!tourname) {  
                    setError('Tour name is required.');  
                    setLoading(false);  
                    return;  
                }  
        
                try {  
                    const response = await axios.get(`https://triptide.pythonanywhere.com/planner/travels/debts/`, {  
                        headers: {  
                            Authorization: localStorage.getItem("token"),  
                        },   
                        params: { travel_name: tourname }   
                    });  
        
                    // Transform the user debts into an array format  
                    const debtsArray = Object.entries(response.data.user_debts_to_others || {}).map(([name, amount]) => ({  
                        name,     
                        amount: parseFloat(amount).toFixed(2)    
                    }));  
                    const recievearray = Object.entries(response.data.others_debt_to_user || {}).map(([name, amount]) => ({  
                        name,     
                        amount: parseFloat(amount).toFixed(2) 
                    }));   
                    console.log(response.data)  ;     
                    setDebts(debtsArray);   // Set debts  
                    setReceivables(recievearray); // Assuming this data is structured correctly  
                    setPastPayments(response.data.past_payments || []); // Assuming this data is structured correctly  
                    setdataphoto(response.data.photo);
                    setLoading(false);  
                    setError("");   
                } catch (err) {  
                    console.error(err);  
                    setLoading(false);  
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

        const renderContent = () => {  
            if (loading) return <p>Loading...</p>;  
            if (error) return <p style={{ color: 'red' }}>{error}</p>;  

            switch (activeTab) {  
                case 'Debts':  
                    return debts.length ? (  
                        debts.map(item => (  
                            <div key={item.id} className="balance-item" style={{ color: data.has_debt  ? 'red' : 'green' }}>  
                                <p><strong style={{ color: '#5767aa' }}>{item.name} :</strong> ${item.amount}</p>  
                                <button onClick={() => handleMarkAsPaid(item.id)}>Mark as Paid</button>  
                            </div>  
                        ))  
                    ) : (  
                        <NoDataMessage tab={activeTab} dataphoto={dataphoto} />  
                    );  

                case 'Receivables':  
                    return receivables.length ? (  
                        receivables.map(item => (  
                            <div key={item.id} className="balance-item" style={{ color: data.has_debt ? 'red' : 'green' }}>  
                                <p><strong style={{ color: '#5767aa' }}>{item.name} :</strong> ${item.amount}</p>  
                            </div>  
                        ))  
                    ) : (  
                        <NoDataMessage tab={activeTab} dataphoto={dataphoto} />  
                    );  

                case 'Payments':  
                    return pastPayments.length ? (  
                        pastPayments.map(item => (  
                            <div key={item.id} className="balance-item" style={{ color: 'gray' }}>  
                                <p><strong style={{ color: '#5767aa' }}>{item.name} :</strong> ${item.amount}</p>  
                            </div>  
                        ))  
                    ) : (  
                        <NoDataMessage tab={activeTab} dataphoto={dataphoto} />  
                    );  

                default:  
                    return null;  
            }  
        };  

        const NoDataMessage = ({ tab, dataphoto }) => (  
            <div style={{ textAlign: "center" }}>   
                <br/>   
                <p style={{ fontWeight: "bold", fontSize: "20px",color:"white" }}>You have no {tab}!</p>  
                <img src={dataphoto} alt="No data" />  
            </div>  
        );  

        return (  
            <div className="w3-container-b balance-container">  
                <br/>  
                <div className="sidebar-b"> {/* Sidebar for tabs */}  
                    <div className={`tablink-b ${activeTab === 'Debts' ? 'active' : ''}`} onClick={() => openCity('Debts')}>  
                        Debts  
                    </div>  
                    <div className={`tablink-b ${activeTab === 'Receivables' ? 'active' : ''}`} onClick={() => openCity('Receivables')}>  
                        Receivables  
                    </div>  
                    <div className={`tablink-b ${activeTab === 'Payments' ? 'active' : ''}`} onClick={() => openCity('Payments')}>  
                        Past Payments   
                    </div>  
                </div>  
  
                <div className="content-b"> {/* Content for selected tab */}  
                    <h2 style={{ color: "#22487a" }}>My {activeTab}</h2>  
                    <br/>     
                    <div className="balance-list-b">  
                        {renderContent()}  
                    </div>   
                </div>  
            </div>   
        );  
    };  

    return <TourList />;  
};   

export default BalanceList;