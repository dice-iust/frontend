import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import './BalanceList.scss';  

const BalanceList = ({ balances, setBalances }) => {  
    const handleMarkAsPaid = (id) => {  
        setBalances((prev) => prev.filter(item => item.id !== id));  
    };  

    const TourList = () => {   
        const [activeTab, setActiveTab] = useState("Debts"); 
        const[dataphoto,setdataphoto] =useState("");
        const navigate = useNavigate();   
        
        const openCity = (cityName) => {  
            setActiveTab(cityName);  
        };  

        return (  

            <div className="w3-container balance-container">  

                <br/>
                <div className="sidebar"> {/* Sidebar for tabs */}  
                    <div className={`tablink ${activeTab === 'Debts' ? 'w3-border-red' : ''}`} onClick={() => openCity('Debts')}>  
                        Debts  
                    </div>  
                    <div className={`tablink ${activeTab === 'Receivables' ? 'w3-border-red' : ''}`} onClick={() => openCity('Receivables')}>  
                        Receivables  
                    </div>  
                    <div className={`tablink ${activeTab === 'Payments' ? 'w3-border-red' : ''}`} onClick={() => openCity('Payments')}>  
                        Past Payments   
                    </div>  
                </div>  
  
                <div className="content"> {/* Content for selected tab */}  
                    <h2 style={{ color: "#22487a" }}>My {activeTab}</h2>  
                    <br/>     
                    <div className="balance-list">  
                        {balances.length >= 1 ? (  
                          balances.map((item) => (  
                            <div key={item.id} className="balance-item" style={{ color: item.type === 'owing' ? 'red' : 'green' }}>  
                                <p><strong style={{ color: '#5767aa' }}>{item.name}:</strong> ${item.amount}</p>  
                                <button onClick={() => handleMarkAsPaid(item.id)}>Mark as Paid</button>  
                            </div>  
                        ))   
                        ) : (  
                            <div style={{ textAlign: "center" }}>   
                                <br/>   
                                <p style={{ fontWeight: "bold", fontSize: "20px" }}>You have no {activeTab}!</p>  
                                <img src={dataphoto} alt="No trips" />  
                            </div>  
                        )}    
                    </div>   
                </div>  
            </div>   
        );  
    };  

    return <TourList />;  
};   

export default BalanceList;