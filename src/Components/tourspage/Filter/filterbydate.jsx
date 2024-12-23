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
import { useNavigate } from 'react-router-dom';  
import { Button } from '@mui/material';
import './Dropdown.scss';  
import FilterByName from './filterbyname.jsx';  
import { FiCalendar } from "react-icons/fi";
import { PiNotePencil } from "react-icons/pi";
import { BiSolidCar } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { Link } from 'react-router-dom'; 
import FilterByTransport from './filterbytransportation.jsx';

const DateRangePicker = () => {  

  const [startDate, setStartDate] = useState(null);  
  const [endDate, setEndDate] = useState(null);  
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);   
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);  
  const [startDateError, setStartDateError] = useState('');   
  const [endDateError, setEndDateError] = useState('');  
  const [isstart, setstart] = useState(null);  
  const [resultData, setResultData] = useState([]);  
  const [isend, setend] = useState(null);   
  const [istrip, setIstrip] = useState(null);  
  const [showbydate, setshowbydate] = useState(true);  
  const [showbyname, setshowbyname] = useState(false);  
  const [showbytransport, setshowbytransport] = useState(false);    
  const today = new Date();   

  const [isOpen, setIsOpen] = useState(false);  
  const [selectedFilter, setSelectedFilter] = useState(null);  
  
    const filters = [  
      { id: 1, label: 'Date', icon: <FiCalendar className="moveicons-filter" /> },  
      { id: 2, label: 'Name', icon: <PiNotePencil className="moveicons-filter" /> },  
      { id: 3, label: 'Transportation', icon: <BiSolidCar className="moveicons-filter"/> },  
    ];  
  
    const toggleDropdown = () => setIsOpen(!isOpen);  

    const handledate = () => {  
      setshowbydate(true);  
      setshowbyname(false);  
      setshowbytransport(false);  
    };  
  
    const handlename = () => {  
      setshowbydate(false);  
      setshowbyname(true);  
      setshowbytransport(false);  
    };  
  
    const handletransport = () => {  
      setshowbydate(false);  
      setshowbyname(false);  
      setshowbytransport(true);  
    };  
  
    const handleFilterSelect = (filter) => {  
      setSelectedFilter(filter);  
      setIsOpen(false);
      if (filter.label === 'Date') {  
        handledate();  
      } else if (filter.label === 'Name') {  
        handlename();  
      } else if (filter.label === 'Transportation') {  
        handletransport();  
      }    
    };  
  
  const navigate = useNavigate();  

  const handleCreateNewTrip = () => {  
    navigate('/Profile', { state: { showAddTrip: true ,  showMyTrips: false} });  
  };  

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
    setIsStartDateOpen(true);
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

      // setMessage(`your travel options for the dates ${formattedStartDate} to ${formattedEndDate}`);  
      await fetchTravelData(formattedStartDate, formattedEndDate);  
    } else {  
      // setMessage('');   
    }  
    resetDatePickers();  
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
        setIstrip(false);
        // setNoTripsMessage('No trips available for the selected dates.Create your own unique journey!'); 
      } else {  
        setIstrip(true);
        setstart(start);
        setend(end);
        // setNoTripsMessage(`your travel options for the dates ${start} to ${end}`); // Clear the message if trips are available  
      }  
    } catch (error) {  
      console.error('Error fetching data from backend:', error);  
      setResultData([]);   
      // setNoTripsMessage('Error fetching data.'); // Optional error message  
    }  

    
  };  

  const resetDatePickers = () => {  
    setStartDate(null);  
    setEndDate(null);  
    setIsStartDateOpen(false);
    setIsEndDateOpen(false);  
  };  

  const resetErrors = () => {  
    // setMessage('');  
    // setNoTripsMessage(''); // Reset no trips message when errors are reset    
    setIstrip(null);
    setstart(null);
    setend(null);
    setResultData([]);
  }  
  
  return (
    <div className="firstdiv">
      {showbydate ? (    
    <div className="date-range-picker">  
      
        <div className="date-range-picker2">  
          <div className="header-container">  
            <div className="filter-dropdown">  
              <button className="filter-button" onClick={toggleDropdown}>  
                <FiFilter className="moveicons-filters"/> Filter  
              </button>  
              {isOpen && (  
                <div className="dropdown-menu">  
                  {filters.map((filter) => (  
                    <div  
                      key={filter.id}  
                      className="dropdown-item"  
                      onClick={() => handleFilterSelect(filter)}  
                    >  
                      <span>{filter.icon}</span> {filter.label}  
                    </div>  
                  ))}  
                </div>  
              )}  
            </div>  
            <h2 className='h2class'>  
              <MdEditCalendar className='movecalicon' /> Choose Trip Date  
            </h2>  
          </div>  
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
                maxDate={endDate || undefined}  
                open={endDate ? (!startDate ? isStartDateOpen : undefined) : undefined}  
                openToDate={endDate || undefined}  
                showMonthDropdown  
                showYearDropdown  
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
                minDate={startDate || undefined}  
                dateFormat="MMMM d, yyyy"  
                placeholderText="Select an end date"  
                open={startDate ? (!endDate ? isEndDateOpen : undefined) : undefined}  
                openToDate={startDate || undefined}  
                showMonthDropdown  
                showYearDropdown  
              />  
              {endDateError && <p className="error-message">{endDateError}</p>}  
            </div>  
            <button onClick={handleButtonClick} className="submit-button">  
              <FaSearch className='moveiconsearch' />  
            </button>  
          </div>  

          <div className="selected-dates">  
            {istrip != null && (  
              !istrip ? (  
                <p>  
                  <span className="no-trips-blue">No trips available for the selected dates. </span>  
                  <span className="no-trips-orange" onClick={handleCreateNewTrip}>  
                    Create your own unique journey!  
                  </span>  
                </p>  
              ) : (  
                <p>  
                <span className="no-trips-blue">Your travel options for the dates </span>  
                <span className="no-trips-orange2">{isstart} </span> 
                <span className="no-trips-blue2">to</span> 
                <span className="no-trips-orange3">{isend}</span>  
              </p>  
              )  
            )}  
          </div>  

          <div className="tour-list-filter">  
            {resultData.map((item) => (  
               <Link   
                             key={item.name}   
                             to={{  
                               pathname: `/TripsPage/${item.name}`,  
                               state: { item}
                             }}   
                             className="tour-card-filter"  
                           >    
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
                      <GrMoney aria-hidden="true" />  
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
              </Link>  
            ))}  
          </div>  
        </div> 
        </div>   
      ) : showbyname ? (  
        <FilterByName />  
      ) :
      showbytransport?(<FilterByTransport/>):
       null}   
    </div>
    
  );  
};  

export default DateRangePicker;