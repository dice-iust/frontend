import React, { useEffect,useState } from "react";  
import "./ExpenseUserList.scss";  
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";   
import axios from "../../../api/axios.js";  

const NewExpense = ({tourname,props} ) => {  
  const { users,payer, title, price, date, description, cat, factorImage } = props;  
  const [showDetails, setShowDetails] = useState(false);  

  const handleShowDetails = () => {  
    setShowDetails((prev) => !prev);  
  }; 
  
  return (  
    <> 
      <div className={showDetails ? "newExpense-box-showDetails" : "newExpense-box"}>  
        <div className="expense-box profile-expense">  
        {cat && (  
            <img src={cat} alt="Rectangle Icon" className="small-rectangle-image" />  
          )}  
          <span className="title-expense">{title}</span> {/* Title on the left side */}  
          {users && users.length > 0 && (  
          <div className="users-container">  
            {users.map((user) => (  
              <div key={user.id} className="user-box">  
                <img src={user.profilePicture} alt={user.user_name} className="user-image" /> {/* Circular image */}  
                <span>{user.user_name}</span>  
              </div>  
            ))}  
          </div>  
          )} 
          <div className="amount-container">  
            <span className="amount">{price} $</span> {/* Amount on the right side */}  
            {showDetails ? (  
              <MdKeyboardArrowUp className="arrowIcon" onClick={handleShowDetails} />  
            ) : (  
              <MdKeyboardArrowDown className="arrowIcon" onClick={handleShowDetails} />  
            )}  
          </div>  
        </div>  

        {/* Updated Paid By section to include circular image */}  
        <div className="expense-box">  
          <span className="paid-by">  
            <strong>Paid by:</strong>   
            <img src={payer.profilePicture} alt={payer.user_name} className="user-image" /> {/* Circular image */}  
            {payer.user_name}  
          </span>   
        </div>  
      </div>  

      {showDetails && (  
        <div className="details-box">  
          <div className="expense-box details-row">  
            <span><strong>Description:</strong> {description}</span> {/* Make "Description:" bold, but not its value */}             
            <span><strong>Date: </strong>{date}</span>  
          </div>  
          <img src={factorImage} alt="Detail Illustration" className="rectangle-image" /> {/* Rectangle image */}  
        </div>  
      )}  

    </>  
  );  
};  

export default NewExpense;