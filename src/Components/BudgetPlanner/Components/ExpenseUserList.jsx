import React, { useState } from "react";  
import "./ExpenseUserList.scss";  
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";   

const NewExpense = (props) => {  
  const { username, title, price, date, description } = props;  
  const [showDetails, setShowDetails] = useState(false);  

  const handleShowDetails = () => {  
    setShowDetails((prev) => !prev);  
  };  

  return (  
    
    <>  
   
      <div className={showDetails ? "newExpense-box-showDetails" : "newExpense-box"}>  
        <div className="expense-box profile-expense">  
          <span className="title-expense">{title}</span> {/* Title on the left side */}  
          <div className="amount-container">  
            <span className="amount">{price} $</span> {/* Amount on the right side */}  
            {showDetails ? (  
              <MdKeyboardArrowUp className="arrowIcon" onClick={handleShowDetails} />  
            ) : (  
              <MdKeyboardArrowDown className="arrowIcon" onClick={handleShowDetails} />  
            )}  
          </div>  
        </div>  

        <div className="expense-box">  
          <span className="paid-by"><strong>Paid by:</strong> {username}</span> {/* "Paid by:" is bold and username is regular */}  
        </div>  
      </div>  

      {showDetails && (  
        <div className="details-box">  
          <div className="expense-box details-row">  
          <span><strong>Description:</strong> {description}</span> {/* Make "Description:" bold, but not its value */}             
           <span><strong>Date: </strong>{date}</span>  
          </div>  
        </div>  
      )}  
    </>  
  );  
};  

export default NewExpense;