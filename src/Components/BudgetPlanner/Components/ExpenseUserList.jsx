import React, { useState } from "react";  
import "./ExpenseUserList.scss";  
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";   

const NewExpense = (props) => {  
  const { username, title, price, date, description, userImage, rectangleImage } = props;  
  const [showDetails, setShowDetails] = useState(false);  

  const handleShowDetails = () => {  
    setShowDetails((prev) => !prev);  
  };  
  const users = [  
    { name: "dorsa", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREHjj0QVmfJLo5BrdEKQZ5td36QsOqjgTQFg&s" },  
    { name: "sara", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREHjj0QVmfJLo5BrdEKQZ5td36QsOqjgTQFg&s" },  
    { name: "ali", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREHjj0QVmfJLo5BrdEKQZ5td36QsOqjgTQFg&s" }  
  ]; 
  return (  
    <>  
      <div className={showDetails ? "newExpense-box-showDetails" : "newExpense-box"}>  
        <div className="expense-box profile-expense">  
        {/* {rectangleImage && (   */}
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREHjj0QVmfJLo5BrdEKQZ5td36QsOqjgTQFg&s" alt="Rectangle Icon" className="small-rectangle-image" />  
          {/* )}   */}
          <span className="title-expense">{title}</span> {/* Title on the left side */}  
          {users && users.length > 0 && (  
          <div className="users-container">  
            {users.map((user, index) => (  
              <div key={index} className="user-box">  
                <img src={user.image} alt={user.name} className="user-image" /> {/* Circular image */}  
                <span>{user.name}</span>  
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
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREHjj0QVmfJLo5BrdEKQZ5td36QsOqjgTQFg&s" alt={username} className="user-image" /> {/* Circular image */}  
            {username}  
          </span>   
        </div>  
      </div>  

      {showDetails && (  
        <div className="details-box">  
          <div className="expense-box details-row">  
            <span><strong>Description:</strong> {description}</span> {/* Make "Description:" bold, but not its value */}             
            <span><strong>Date: </strong>{date}</span>  
          </div>  
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREHjj0QVmfJLo5BrdEKQZ5td36QsOqjgTQFg&s" alt="Detail Illustration" className="rectangle-image" /> {/* Rectangle image */}  
        </div>  
      )}  

 
    </>  
  );  
};  

export default NewExpense;