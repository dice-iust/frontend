import React, { useEffect,useState } from "react";  
import "./ExpenseUserList.scss";  
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";   

const NewExpense = (props ) => {  
  const {                         payer,  
  title,
  price ,
  id, 
  date,  
  description,  
  key,
  cat, 
  factorImage,
  setExpData,
  users,
  tourname } = props;  
  const [showDetails, setShowDetails] = useState(false);  

  const handleShowDetails = () => {  
    setShowDetails((prev) => !prev);  
  }; 
  
  return (  
    <React.Fragment>  
      {/* Use this container for the grid layout */}  
  
      <div className="expense-list-container1">  
        <div className={showDetails ? "newExpense-box-showDetails" : "newExpense-box"}>  
          <div className="expense-box profile-expense">  
            {cat && (  
              <img src={cat} alt="Rectangle Icon" className="small-rectangle-image" />  
            )}  
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
  
          {/* Updated Paid By section to include circular image */}  
          <div className="expense-box">  
            <span className="paid-by">  
              <strong>Paid by:</strong>   
              <img src={payer.profilePicture} alt={payer.user_name} className="user-image" /> {/* Circular image */}  
              {payer.user_name}  
            </span>   
          </div>  
        </div>  
      </div>  
  
      {showDetails && (  
        <div className="expense-list-container1">  
          <div className="details-box">   
            {users && users.length > 0 && (  
              <div className="users-container">  
                {users.map((user) => (  
                  <div key={user.id} className="user-box">  
                    <img src={user.profilePicture} alt={user.user_name} className="user-image" /> {/* Circular image */}  
                    <span className="user-name">{user.user_name}</span>  
                  </div>  
                ))}  
              </div>  
            )}   
            <div className="expense-box details-row">  
              <div className="details-text">  
                <span><strong>Description:</strong> {description}</span>             
                <span><strong>Date: </strong>{date}</span>  
              </div>  
              <img src={factorImage} alt="Detail Illustration" className="rectangle-image" />   
            </div>  
          </div>  
        </div>  
      )}  
    </React.Fragment>  
  );}

export default NewExpense;