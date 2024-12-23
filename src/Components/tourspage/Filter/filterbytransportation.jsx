
import React, { useState } from 'react';  
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
import { FiCalendar } from "react-icons/fi";
import { PiNotePencil } from "react-icons/pi";
import { BiSolidCar } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import FilterByDate from './filterbydate.jsx'; 
import FilterByName from './filterbyname.jsx';
import { Link } from 'react-router-dom';   



const TransportPicker = () => {  

  const [Transportdata, setTransport] = useState(null);  
  const [TransportError, setTransportError] = useState('');   
  const [istransport, setistransport] = useState(null);  
  const [resultData, setResultData] = useState([]);  
  const [istrip, setIstrip] = useState(null); 
  const [showbydate, setshowbydate] = useState(false);  
  const [showbyname, setshowbyname] = useState(false);  
  const [showbytransport, setshowbytransport] = useState(true);   

  const [isOpen, setIsOpen] = useState(false);  
  const [selectedFilter, setSelectedFilter] = useState(null);  
    
    const filters = [  
            { id: 1, label: 'Date', icon: <FiCalendar className="moveicons-filter"/> },  
            { id: 2, label: 'Name', icon: <PiNotePencil className="moveicons-filter"/> },  
            { id: 3, label: 'Transportation', icon: <BiSolidCar className="moveicons-filter"/> },  
    ];  
        
    const toggleDropdown = () => setIsOpen(!isOpen);  
    
    const navigate = useNavigate();  

    const handleCreateNewTrip = () => {  
        navigate('/Profile', { state: { showAddTrip: true ,  showMyTrips: false} });  
    };  

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
  
  const handleTransportChange = (transport) => {  
  
    setTransport(transport);   
    setTransportError('');  
    resetErrors();  
  };  


  const handleButtonClick = async () => {   
    let hasError = false;   
   
    if (!Transportdata) {  
      setTransportError('Please select an option');  
      hasError = true;  
    } else {  
      setTransportError('');   
    }   
    if (!hasError) {    
      await fetchTravelData(Transportdata);  
    } 
    resetTransportPickers();  
  };  

  const fetchTravelData = async (transportationdata) => {  
    try {  
      const response = await axios.get(`https://triptide.liara.run//travels/filter/`, {  
        params: {  
          transportation : transportationdata
        },  
      });  
      console.log('Response from backend:', response.data);  
      setResultData(response.data);  

      
      if (response.data.length === 0) {  
        setIstrip(false);
        
      } else {  
        setIstrip(true);
        setistransport(transportationdata);
        
      }  
    } catch (error) {  
      console.error('Error fetching data from backend:', error);  
      setResultData([]);   
      
    }  

    
  };  

  const resetTransportPickers = () => {  
    setTransport(null);  
  };  

  const resetErrors = () => {     
    setIstrip(null);
    setistransport(null);
    setResultData([]);
  }  
  
  return (  
    <div className='firstdiv'>
          {showbytransport ? (    
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
                  <BiSolidCar  className='movecalicon' /> Select Transportation Option
                </h2>  
              </div>  
              <div className="date-picker-container">  
              <div className="name-picker">  
                    <label>Transportation</label>  
                    <select className="select-transport" value={Transportdata || ""} onChange={(e) => setTransport(e.target.value)} placeholder="Transportation">  
                        <option value="" disabled>Select Transportation</option>  
                        <option value="Car">Car</option>  
                        <option value="Bus">Bus</option>  
                        <option value="Train">Train</option>  
                        <option value="Plane">Plane</option>  
                    </select>  
                    
                    {TransportError && <p className="error-message-name">{TransportError}</p>}   
                </div>  
                <button onClick={handleButtonClick} className="submit-button">  
                  <FaSearch className='moveiconsearch' />  
                </button>  
              </div>  
    
              <div className="selected-dates">  
                {istrip != null && (  
                  !istrip ? (  
                    <p>  
                      <span className="no-trips-blue">No trips available with this Transportation option. </span>  
                      <span className="no-trips-orange" onClick={handleCreateNewTrip}>  
                        Create your own unique journey!  
                      </span>  
                    </p>  
                  ) : (  
                    <p>  
                    <span className="no-trips-blue">Your travel options with </span>  
                    <span className="no-trips-orange2-transport">{istransport} </span> 
                    
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
          ) : showbydate ? (  
            <FilterByDate />  
          ) : showbyname? ( <FilterByName/>
        ):null}  
        </div>
        
      );  
};  

export default TransportPicker;