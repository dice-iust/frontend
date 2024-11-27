// DateRangePicker.jsx  
import React, { useState } from 'react';  
import DatePicker from 'react-datepicker';  
import 'react-datepicker/dist/react-datepicker.css';  
import './filterbydate.scss';
import { MdEditCalendar } from "react-icons/md";  

const DateRangePicker = () => {  
  const [startDate, setStartDate] = useState(null);  
  const [endDate, setEndDate] = useState(null);  
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);   

  const today = new Date();  
  const nextyears=new Date(today.getFullYear() + 1, 12, 30);
  
  const handleStartDateChange = (date) => {  
    setStartDate(date);  
    setIsEndDateOpen(true);   

    if (endDate && date > endDate) {  
      setEndDate(null);  
    }  
  };  

  const handleEndDateChange = (date) => {  
    setEndDate(date);  
    if (date) {  
      setIsEndDateOpen(false);  
    }  
  };  

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
        </div>  
      </div>  
      <div className="selected-dates">  
        {startDate && endDate ? (  
          <p>  
           
          </p>  
        ) : (  
          <p></p>  
        )}  
      </div>  
    </div>  
  );  
};  

export default DateRangePicker;