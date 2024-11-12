import React from 'react'; 
import './alltours.scss'; 
import { MdDateRange } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { FaCarSide } from "react-icons/fa6";
import { FaPlane } from "react-icons/fa";
import { TbTrain } from "react-icons/tb";
import { TbBus } from "react-icons/tb";
import { FaUndoAlt } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa6";



const TourList = () => {  
  const tours = [  
    {  
      id: 4,  
      name: "City Trip",  
      date: "2023-11-15",  
      photo: "https://plus.unsplash.com/premium_photo-1697729905164-f61ad5207758?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVocmFufGVufDB8fDB8fHww",
      destination: "Tehran",  
      admin: { name: "Admin5", photo: "https://clipart-library.com/2023/Admin-Profile-Vector-PNG-Clipart.png" }, 
      type : "Budget-Friendly" , 
      startPlace : "Isfahan",
      transportation : "Car",
       returnDate : "2023-11-27"
    }, 
    {  
        id: 2,  
        name: "Nature Trip",  
        date: "2023-11-15",  
        photo: "https://cdn.nody.ir/files/2021/10/25/nody-%D8%B9%DA%A9%D8%B3-%D8%B2%DB%8C%D8%A8%D8%A7-%D8%A7%D8%B2-%D9%BE%D8%A7%DB%8C%DB%8C%D8%B2-%D8%B4%D9%85%D8%A7%D9%84-1635137298.jpg",  
        admin: { name: "Admin5", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZQdHyyrnf31L6mDHY72cGoNXd_lzO8AHv1Asoj3Vtb2cBPcspyi_Fl3R1Ar1RjdtcRhk&usqp=CAU" },  
        destination: "Gilan", 
        type : "fancy" ,
        startPlace : "Tehran",
        transportation : "Train",
         returnDate : "2023-11-24"
      }, 
    {  
        id: 1,  
        name: "City Trip",  
        date: "2023-10-10",  
        photo: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/c22254fa-16b3-4b2d-93b5-1d137d507a04/9326e659-781d-4b90-89b2-106c1bf54c18.png",
        admin: { name: "Admin5", photo: "https://png.pngtree.com/png-clipart/20230408/original/pngtree-admin-of-female-job-vacancies-png-image_9037122.png" },  
        type : "Budget-Friendly" ,
        destination: "Shiraz", 
        startPlace : "Yazd",
        transportation : "Plane",
         returnDate : "2023-10-25"
      }, 
      
      {  
        id: 3,  
        name: "Adventure Trip",  
        date: "2023-12-20",  
        photo: "https://cdn.mashreghnews.ir/d/2021/07/06/4/3192979.jpg",
        destination: "sari", 
        admin: { name: "Admin5", photo: "https://png.pngitem.com/pimgs/s/111-1114718_transparent-sleep-icon-png-person-icon-circle-png.png" },   
        type : "fancy", 
        startPlace : "Tehran",
        transportation : "Bus",
         returnDate : "2023-12-23"
      },  
    {  
        id: 5,  
        name: "Winter Trip ",  
        date: "2023-12-20",  
        photo: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGYtNDAtbHVrZXN0YWNrcG9vbGUtc2tpLXNsb3BlLmpwZw.jpg",
        destination: "Mazandaran",  
        admin: { name: "Admin5", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz8eSw47BxCpB5qcTaEsA_U7poqHaCDa0ZAQ&s" }, 
        type : "Budget-Friendly" ,
        startPlace : "Babol",
        transportation : "Train",
        returnDate : "2023-12-21"
      },  
    
      
   
   
   
  ]; 

  const formatDate = (dateString) => {  
    const [year, month, day] = dateString.split('-');  
    return `${year}/${month}/${day}`; 
  };  
  
  
  
  const getTransportationIcon = (transportation) => {  
    switch (transportation.toLowerCase()) {  
      case 'train':  
        return <TbTrain style={{ marginRight: '1.5px' }} />;  
      case 'bus':  
        return <TbBus style={{ marginRight: '1.5px' }} />;  
      case 'plane':  
        return <FaPlane style={{ marginRight: '1.5px' }} />;  
      case 'car':  
        return <FaCarSide style={{ marginRight: '1.5px' }}/>;  
      default:  
        return null; 
    }  
  };  

  return (  
    <div className="tour-list-container">  
      <div className="tour-list">  
        {tours.map((tour) => (  
          <div key={tour.id} className="tour-card">  
            <img src={tour.photo} alt={tour.name} className="tour-image" />  
            <div className="tour-info">  
              <h2 className="tour-name">{tour.name}</h2>  
              
              
              <p className="tour-route">  
                {tour.startPlace} {getTransportationIcon(tour.transportation)}  {tour.destination}  
              </p>   
              
              
              <p className="tour-dates" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>  
              <FaRegCalendar style={{ marginRight: '1.5px' }}/>   
              <span >  
                {formatDate(tour.date)}  
              </span>  
            </p>  
            
            <p className="tour-length" style={{ textAlign: 'center' }}>  
              <FaUndoAlt style={{ marginRight: '1.5px' }} />   
              {formatDate(tour.returnDate)}  
            </p>  
              
              
              <span className={`tour-type ${tour.type}`}>   
                <GrMoney /> {tour.type.charAt(0).toUpperCase() + tour.type.slice(1)}  
              </span>  
              
              {tour.admin && (  
                <p className="tour-admin">  
                  <img   
                    src={tour.admin.photo}   
                    alt={`${tour.admin.name} profile`}   
                    className="admin-photo"   
                  />  
                  Admin: {tour.admin.name}  
                </p>  
              )}   
            </div>  
          </div>  
        ))}  
      </div>  
    </div>  
  );
};  

export default TourList;