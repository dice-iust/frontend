import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom'; // Import useNavigate  
import './BalanceList.scss'; // Optional: Style your component  

const BalanceList = ({ balances, setBalances }) => {  
    const handleMarkAsPaid = (id) => {  
        setBalances((prev) => prev.filter(item => item.id !== id));  
    };  

    const TourList = () => {   
        const [activeTab, setActiveTab] = useState("London");  
        const navigate = useNavigate();  
        const [datacurrent, setDatacurrent] = useState(null);  
        const [dataphoto, setDataphoto] = useState(null);  
        const [datapast, setDatapast] = useState(null);  
        const [datafuture, setDatafuture] = useState(null);  
        
        const openCity = (cityName) => {  
            setActiveTab(cityName);  
        };  

        const renderBalanceList = () => {  
            return (  
                <div className="balance-list">  
                    <h2>Balance List</h2>  
                    {balances.length === 0 ? (  
                        <p>No outstanding balances.</p>  
                    ) : (  
                        balances.map((item) => (  
                            <div key={item.id} className="balance-item" style={{ color: item.type === 'owing' ? 'red' : 'green' }}>  
                                <p><strong style={{ color: '#5767aa' }}>{item.name}:</strong> ${item.amount}</p>  
                                <button onClick={() => handleMarkAsPaid(item.id)}>Mark as Paid</button>  
                            </div>  
                        ))  
                    )}  
                </div>  
            );  
        };  

        return (  
            <div className="w3-container">  
                <h2 style={{color:"#22487a"}}>Balances</h2>  

                <div className="w3-row">  
                    <div className={`tablink ${activeTab === 'London' ? 'w3-border-red' : ''}`} onClick={() => openCity('London')}>  
                        My Debts  
                    </div>  
                    <div className={`tablink ${activeTab === 'Paris' ? 'w3-border-red' : ''}`} onClick={() => openCity('Paris')}>  
                        Future  
                    </div>  
                    <div className={`tablink ${activeTab === 'Tokyo' ? 'w3-border-red' : ''}`} onClick={() => openCity('Tokyo')}>  
                        Past Payments 
                    </div>  
                </div>  
  
                <div className="city">  
                    <h2 style={{ color: "#22487a" }}>{activeTab} Trips</h2>  
                    <br/>     
                    <div className="tour-list-container2">  
                        {datacurrent && datacurrent.length >= 1 ? (  
                            renderBalanceList()  
                        ) : (  
                            <div style={{ textAlign: "center" }}>   
                                <br/>   
                                <p style={{ fontWeight: "bold", fontSize: "20px" }}>You have no current trips!</p>  
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