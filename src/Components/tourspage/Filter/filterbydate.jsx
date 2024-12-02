// DateRangePicker.jsx  
import React, { useState } from 'react';  
import DatePicker from 'react-datepicker';  
import 'react-datepicker/dist/react-datepicker.css';  
import './filterbydate.scss';  
import { MdEditCalendar } from "react-icons/md";  
import { FaSearch } from "react-icons/fa";   
import axios from 'axios';   
import { GrMoney } from "react-icons/gr";  
import { FaCarSide, FaPlane, FaUndoAlt, FaRegCalendar } from "react-icons/fa";  
import { TbTrain, TbBus } from "react-icons/tb";  

const DateRangePicker = () => {  
  const [startDate, setStartDate] = useState(null);  
  const [endDate, setEndDate] = useState(null);  
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);  
  const [startDateError, setStartDateError] = useState('');   
  const [endDateError, setEndDateError] = useState('');  
  const [message, setMessage] = useState('');  
  const [resultData, setResultData] = useState([]);  
  const [noTripsMessage, setNoTripsMessage] = useState(''); 
  const today = new Date();  

  const formatDate = (dateString) => {  
    const [year, month, day] = dateString.split('-');  
    return `${year}/${month}/${day}`;  
  };  

  const getTransportationIcon = (transportation) => {  
    switch (transportation.toLowerCase()) {  
      case 'train':  
        return <TbTrain className="moveicon"/>;  
      case 'bus':  
        return <TbBus className="moveicon" />;  
      case 'plane':  
        return <FaPlane className="moveicon" />;  
      case 'car':  
        return <FaCarSide className="moveicon"/>;  
      default:  
        return null;  
    }  
  };  
  
  const handleStartDateChange = (date) => {  
    const startOfDayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));  
    setStartDate(startOfDayUTC);  
    setIsEndDateOpen(true);   
    setStartDateError('');  

    if (endDate && startOfDayUTC > endDate) {  
      setEndDate(null);  
    }   
    
    resetErrors();  
  };  

  const handleEndDateChange = (date) => {  
    const endOfDayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));  
    setEndDate(endOfDayUTC);  
    setEndDateError('');   
    setIsEndDateOpen(false);  
  };  

  const handleButtonClick = async () => {   
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
      const formattedStartDate = startDate.toISOString().split('T')[0];  
      const formattedEndDate = endDate.toISOString().split('T')[0];  

      setMessage(`your travel options for the dates ${formattedStartDate} to ${formattedEndDate}`);  
      await fetchTravelData(formattedStartDate, formattedEndDate);  
    } else {  
      setMessage('');   
    }  
  };  

  const fetchTravelData = async (start, end) => {  
    try {  
      const response = await axios.get(`https://triptide.pythonanywhere.com//travels/filter/`, {  
        params: {  
          start_date: start,  
          end_date: end,  
        },  
      });  
      console.log('Response from backend:', response.data);  
      setResultData(response.data);  

      
      if (response.data.length === 0) {  
        setNoTripsMessage('No trips available for the selected dates.'); 
      } else {  
        setNoTripsMessage(`your travel options for the dates ${start} to ${end}`); // Clear the message if trips are available  
      }  
    } catch (error) {  
      console.error('Error fetching data from backend:', error);  
      setResultData([]);   
      setNoTripsMessage('Error fetching data.'); // Optional error message  
    }  
  };  

  const resetDatePickers = () => {  
    setStartDate(null);  
    setEndDate(null);  
    setIsEndDateOpen(false);  
  };  

  const resetErrors = () => {  
    setMessage('');  
    setNoTripsMessage(''); // Reset no trips message when errors are reset  
  }  
  
  return (  
    <div className="date-range-picker">  
      <div className="date-range-picker2">  
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
      </div>  

      <div className="selected-dates">   
          
          <p className="no-trips-message">{noTripsMessage}</p>  
        
     </div>  

      <div className="tour-list-filter">  
        {resultData.map((item) => (  
          <div key={item.Id} className="tour-card-filter">  
            <div className="tour-image-container-filter">  
              <img  
                src={item.image_url}  
                alt={`Image of ${item.name}`}  
                className="tour-image-filter"  
              />  
              {item.admin && (  
                <div className="tour-admin-filter">  
                  <img  
                    src={item.admin.phrofile_image}   
                    alt={`Profile of ${item.admin.user_name}`}  
                    className="admin-photo-filter"  
                  />  
                  {item.admin.user_name}   
                </div>  
              )}  
            </div>  
            <div className="tour-info-filter">  
              <p className="tour-meta-filter3">  
                <span className="tour-name-filter">{item.name}</span>  
                <div className={`trip-type-filter ${item.mode}`}>  
                  <GrMoney aria-hidden="true" />{" "}  
                  {item.mode.charAt(0).toUpperCase() + item.mode.slice(1)}  
                </div>  
              </p>  
              <div className="tour-details-filter">  
                <p className="tour-route-filter">  
                    <span className="tour-text-filter">{item.start_place} {getTransportationIcon(item.transportation)} {item.destination}</span>  
                </p>  
              </div>  
              <div className="tour-meta-filter7">  
                <p className="tour-dates-filter">  
                  <FaRegCalendar className='moveicon-filter3' />  
                  <span>{formatDate(item.start_date)}</span>  
                </p>  
                <p className="tour-length-filter" style={{ textAlign: "left" }}>  
                  <FaUndoAlt className='moveicon-filter3' />  
                  {formatDate(item.end_date)}  
                </p>  
              </div>   
            </div>  
          </div>  
        ))}  
      </div>  
    </div>  
  );  
};  

export default DateRangePicker;