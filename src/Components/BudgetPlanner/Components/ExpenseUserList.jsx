import React, { useEffect,useState } from "react";  
import "./ExpenseUserList.scss";  
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";   
import axios from "../../../api/axios.js";  
const NewExpense = ({tourname} ) => {  
  // const { username, title, price, date, description, userImage, rectangleImage } = props;  
  const [showDetails, setShowDetails] = useState(false);  

  const handleShowDetails = () => {  
    setShowDetails((prev) => !prev);  
  }; 
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);   
  const [data, setData] = useState([]);  
  const users = [  
    { name: "dorsa", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREHjj0QVmfJLo5BrdEKQZ5td36QsOqjgTQFg&s" },  
    { name: "sara", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREHjj0QVmfJLo5BrdEKQZ5td36QsOqjgTQFg&s" },  
    { name: "ali", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREHjj0QVmfJLo5BrdEKQZ5td36QsOqjgTQFg&s" }  
  ]; 
    useEffect(() => {  
        const fetchTripData = async () => {  
            if (!tourname) {  
                setError('Tour name is required.');  
                setLoading(false);  
                return;  
            }  
            try {  
                const response = await axios.get(`https://triptide.pythonanywhere.com/planner/allpay/`, {  
                    headers: {  
                        Authorization: localStorage.getItem("token"),  
                    },   
                    params: { travel_name: tourname }   
                });  
                setData(response.data.pays || []);  // Ensure valid participants are set  
                setLoading(false);  // Stop loading after fetching data
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
  return (  
    <> 
      <div className={showDetails ? "newExpense-box-showDetails" : "newExpense-box"}>  
        <div className="expense-box profile-expense">  
        {data.category_icon && (  
            <img src={data.category_icon} alt="Rectangle Icon" className="small-rectangle-image" />  
          )}  
          <span className="title-expense">{data.title}</span> {/* Title on the left side */}  
          {data.participants && data.participants.length > 0 && (  
          <div className="users-container">  
            {data.participants.map((user) => (  
              <div key={user.id} className="user-box">  
                <img src={user.profilePicture} alt={user.user_name} className="user-image" /> {/* Circular image */}  
                <span>{user.user_name}</span>  
              </div>  
            ))}  
          </div>  
          )} 
          <div className="amount-container">  
            <span className="amount">{data.amount} $</span> {/* Amount on the right side */}  
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
            <img src={data.payer.profilePicture} alt={data.payer.user_name} className="user-image" /> {/* Circular image */}  
            {data.payer.user_name}  
          </span>   
        </div>  
      </div>  

      {showDetails && (  
        <div className="details-box">  
          <div className="expense-box details-row">  
            <span><strong>Description:</strong> {data.description}</span>              
            <span><strong>Date: </strong>{data.created_at}</span>  
          </div>  
          <img src={data.receipt_image} alt="Detail Illustration" className="rectangle-image" />  
        </div>  
      )}  
    </>  
  );  
};  

export default NewExpense;