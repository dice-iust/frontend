import React, { useState } from "react";  
import "./AddExpense.scss";  

const AddExpense = (props) => {  
  const { setExpData, setShowAddExpense, handleExpenseListToggle } = props;  

  const [formValue, setFormValue] = useState({  
    userName: "",  
    title: "",  
    amount: "",  
    date: "",  
    description: "",  
  });  

  const [errors, setErrors] = useState({}); // State for errors  

  const handleChange = (e) => {  
    setFormValue({ ...formValue, [e.target.name]: e.target.value });  
    // Clear error when user starts typing  
    if (errors[e.target.name]) {  
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));  
    }  
  };  

  const handleAddExpense = (e) => {  
    e.preventDefault();  
    
    // Clear previous errors  
    setErrors({});  

    const newErrors = {};  
    
    // Validation checks  
    if (!formValue.userName) {  
      newErrors.userName = "Paid By field cannot be empty.";  
    }  
    if (!formValue.title) {  
      newErrors.title = "Title field cannot be empty.";  
    }  
    if (!formValue.amount || isNaN(formValue.amount) || Number(formValue.amount) <= 0) {  
      newErrors.amount = "Amount must be a positive number.";  
    }  
    if (!formValue.date) {  
      newErrors.date = "Date field cannot be empty.";  
    } else if (new Date(formValue.date) > new Date()) {  
      newErrors.date = "Date cannot be in the future.";  
    }  

    if (Object.keys(newErrors).length > 0) {  
      setErrors(newErrors);  
      return; // Prevent form submission if there are errors  
    }  

    // Structure new expense object to match the expected format  
    const newExpense = {  
        username: formValue.userName,  // or whatever property name is expected  
        title: formValue.title,  
        amount: Number(formValue.amount),  // Ensure it's stored as a number  
        date: formValue.date,  
        description: formValue.description,  
        id: Date.now() // Use timestamp as ID (replace this with a proper unique ID generator if needed)  
    };  

    setExpData((prev) => [...prev, newExpense]); // Update the state  
        setShowAddExpense(false); // Close the add expense form  
        handleExpenseListToggle(); // Show the expense list  
        setFormValue({ userName: '', title: '', amount: '', date: '', description: '' }); // Clear form  
        setErrors({}); // Clear errors 
}; 

  return (  
    <div className="main-add-div">  
      <form onSubmit={handleAddExpense}>  
        {/* Row for "Paid By" and "Title" */}  
        <div className="row">  
          <div className="form-item">  
            <label htmlFor="userName" style={{ color: '#22487a',  }}>Paid By</label>  
            <input  
              type="text"  
              name="userName"  
              id="userName"  
              value={formValue.userName}  
              placeholder="Username"  
              onChange={handleChange}  
            />  
            {errors.userName &&<div className="error-message"> {errors.userName}</div>} {/* Error message */}  
          </div>  
          <div className="form-item">  
            <label htmlFor="title" style={{ color: '#22487a', }}>Title</label>  
            <input  
              type="text"  
              name="title"  
              id="title"  
              value={formValue.title}  
              placeholder="Title"  
              onChange={handleChange}  
            />  
            {errors.title && <div className="error-message"> {errors.title}</div>} {/* Error message */}  
          </div>  
        </div>  

        {/* Row for "Amount" and "Date" */}  
        <div className="row">  
          <div className="form-item">  
            <label htmlFor="amount" style={{ color: '#22487a', }}>Amount</label>  
            <input  
              type="text"  
              name="amount"  
              id="amount"  
              value={formValue.amount}  
              placeholder="Amount"  
              onChange={handleChange}  
            />  
            {errors.amount && <div className="error-message"> {errors.amount}</div>} {/* Error message */}  
          </div>  
          <div className="form-item">  
            <label htmlFor="date" style={{ color: '#22487a' }}>Date</label>  
            <input  
              type="date"  
              name="date"  
              id="date"  
              value={formValue.date}  
              onChange={handleChange}  
            />  
            {errors.date &&<div className="error-message"> {errors.date}</div>} {/* Error message */}  
          </div>  
        </div>  

        {/* Description input in its own row */}  
        <div className="form-item">  
          <label htmlFor="description" style={{ color: '#22487a' }}>Description</label>  
          <textarea  
            name="description"  
            id="description"  
            value={formValue.description}  
            placeholder="Description"  
            onChange={handleChange}  
          />  
        </div>  

        <button className="btn" type="submit">  
          Add  
        </button>  
      </form>  
    </div>  
  );  
};  

export default AddExpense;