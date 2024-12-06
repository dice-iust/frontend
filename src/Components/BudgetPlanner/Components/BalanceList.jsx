import React from 'react';  
import './BalanceList.scss'; // Optional: Style your component  

const BalanceList = ({ balances, setBalances }) => {  
    const handleMarkAsPaid = (id) => {  
        setBalances((prev) => prev.filter(item => item.id !== id));  
    };  

    return (  
        <div className="balance-list">  
            <h2>Balance List</h2>  
            {balances.length === 0 ? (  
                <p>No outstanding balances.</p>  
            ) : (  
                balances.map((item) => (  
                    <div key={item.id} className="balance-item" style={{ color: item.type === 'owing' ? 'red' : 'green' }}>  
                        <p>{item.name}: ${item.amount}</p>  
                        <button onClick={() => handleMarkAsPaid(item.id)}>Mark as Paid</button>  
                    </div>  
                ))  
            )}  
        </div>  
    );  
};  

export default BalanceList;