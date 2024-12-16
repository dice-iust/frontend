import React, { useState } from 'react';  
import './Dropdown.scss';  
import { FiCalendar } from "react-icons/fi";
import { PiNotePencil } from "react-icons/pi";
import { BiSolidCar } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";

const FilterDropdown = () => {  
  const [isOpen, setIsOpen] = useState(false);  
  const [selectedFilter, setSelectedFilter] = useState(null);  

  const filters = [  
    { id: 1, label: 'Date', icon: <FiCalendar /> },  
    { id: 2, label: 'Name', icon: <PiNotePencil /> },  
    { id: 3, label: 'Transportation', icon: <BiSolidCar /> },  
  ];  

  const toggleDropdown = () => setIsOpen(!isOpen);  

  const handleFilterSelect = (filter) => {  
    setSelectedFilter(filter);  
    setIsOpen(false);  
  };  

  return (  
    <div className="filter-dropdown">  
      <button className="filter-button" onClick={toggleDropdown}>  
      <FiFilter /> Filter   
      </button>  
      {isOpen && (  
        <div className="dropdown-menu">  
          {/* <div className="dropdown-header">Select</div>   */}
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
  );  
};  

export default FilterDropdown;