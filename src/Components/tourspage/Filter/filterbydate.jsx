// DateRangePicker.jsx  
import React, { useState } from 'react';  
import DatePicker from 'react-datepicker';  
import 'react-datepicker/dist/react-datepicker.css';  
import './filterbydate.scss';  
import { MdEditCalendar } from "react-icons/md";  
import { FaSearch } from "react-icons/fa";  

const DateRangePicker = () => {  
  const [startDate, setStartDate] = useState(null);  
  const [endDate, setEndDate] = useState(null);  
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);  
  const [startDateError, setStartDateError] = useState('');   
  const [endDateError, setEndDateError] = useState('');  
  const [message, setMessage] = useState('');  

  const today = new Date();  
  
  const handleStartDateChange = (date) => {  
    setStartDate(date);  
    setIsEndDateOpen(true);   
    setStartDateError('');  

    if (endDate && date > endDate) {  
      setEndDate(null);  
    } 
    
    Reseterrors();
  };  

  const handleEndDateChange = (date) => {  
    setEndDate(date);  
    setEndDateError('');   
    if (date) {  
      setIsEndDateOpen(false);  
    }  
  };  

  const handleButtonClick = () => {   
    let hasError = false;   
   
    if (!startDate) {  
      setStartDateError('Please select a start date');  
      hasError = true;  
    } else {  
      setStartDateError('');   
    }   
    if (!endDate) {  
      setEndDateError('Please select an end date');  
      hasError = true;  
    } else {  
      setEndDateError('');  
    }  
    if (!hasError) {  
      setMessage(`Selected Dates: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`);  
    } else {  
      setMessage('');   
    }  

    resetDatePickers();  
  };  

  const resetDatePickers = () => {  
    setStartDate(null);  
    setEndDate(null);  
    // setMessage('');  // Clear the selected dates message  
    setStartDateError(''); 
    setEndDateError(''); 
    setIsEndDateOpen(false);  
  };  
  const Reseterrors= () => {
    setMessage('');  
  }
  

  return (  
    <div className="date-range-picker">  
      <h2><MdEditCalendar className='movecalicon'/> Choose Trip Date</h2>  
      <div className="date-picker-container">  
        <div className="date-picker">  
          <label>Trip Start Date</label>  
          <DatePicker  
            selected={startDate}  
            onChange={handleStartDateChange}  
            selectsStart  
            startDate={startDate}  
            endDate={endDate}  
            dateFormat="MMMM d, yyyy"  
            placeholderText="Select a start date"  
            minDate={today}   
          />  
          {startDateError && <p className="error-message">{startDateError}</p>}   
        </div>  
        <div className="date-picker">  
          <label>Trip End Date</label>  
          <DatePicker  
            selected={endDate}  
            onChange={handleEndDateChange}  
            selectsEnd  
            startDate={startDate}  
            endDate={endDate}  
            minDate={startDate}  
            dateFormat="MMMM d, yyyy"  
            placeholderText="Select an end date"  
            open={isEndDateOpen}  
          />  
          {endDateError && <p className="error-message">{endDateError}</p>}   
        </div>  
        <button onClick={handleButtonClick} className="submit-button">  
        <FaSearch className='moveiconsearch' />  
      </button>   
      </div>  
      
      <div className="selected-dates">  
        <p>{message}</p>  
      </div>  
    </div>  
  );  
};  

export default DateRangePicker;