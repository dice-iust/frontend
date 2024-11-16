import React from 'react'; 
import './alltours.scss'; 
// import { MdDateRange } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { FaCarSide } from "react-icons/fa6";
import { FaPlane } from "react-icons/fa";
import { TbTrain } from "react-icons/tb";
import { TbBus } from "react-icons/tb";
import { FaUndoAlt } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";   
import "slick-carousel/slick/slick-theme.css";  
import Slider from "react-slick"; 
// import populartours from "./populartours.jsx";
 


const TourList = () => {  
  
  const tours = [  
    {  
      id: 4,  
      name: "City Trip1",  
      date: "2023-03-15",  
      photo: "https://plus.unsplash.com/premium_photo-1697729905164-f61ad5207758?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVocmFufGVufDB8fDB8fHww",
      destination: "Tehran",  
      admin: { name: "Admin5", photo: "https://clipart-library.com/2023/Admin-Profile-Vector-PNG-Clipart.png" }, 
      type : "Budget-Friendly" , 
      startPlace : "Isfahan",
      transportation : "Car",
       returnDate : "2023-11-27",
       travellers:15,

    }, 
    {  
        id: 2,  
        name: "Nature Trip2",  
        date: "2023-01-15",  
        photo: "https://cdn.nody.ir/files/2021/10/25/nody-%D8%B9%DA%A9%D8%B3-%D8%B2%DB%8C%D8%A8%D8%A7-%D8%A7%D8%B2-%D9%BE%D8%A7%DB%8C%DB%8C%D8%B2-%D8%B4%D9%85%D8%A7%D9%84-1635137298.jpg",  
        admin: { name: "Admin5", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZQdHyyrnf31L6mDHY72cGoNXd_lzO8AHv1Asoj3Vtb2cBPcspyi_Fl3R1Ar1RjdtcRhk&usqp=CAU" },  
        destination: "Gilan", 
        type : "fancy" ,
        startPlace : "Tehran",
        transportation : "Train",
         returnDate : "2023-11-24",
         travellers:2,
      }, 
    {  
        id: 1,  
        name: "City Trip3",  
        date: "2023-02-10",  
        photo: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/c22254fa-16b3-4b2d-93b5-1d137d507a04/9326e659-781d-4b90-89b2-106c1bf54c18.png",
        admin: { name: "Admin5", photo: "https://png.pngtree.com/png-clipart/20230408/original/pngtree-admin-of-female-job-vacancies-png-image_9037122.png" },  
        type : "Budget-Friendly" ,
        destination: "Shiraz", 
        startPlace : "Yazd",
        transportation : "Plane",
         returnDate : "2023-10-25",
         travellers:12,
      }, 
      {  
        id: 1,  
        name: "City Trip3",  
        date: "2023-11-10",  
        photo: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/c22254fa-16b3-4b2d-93b5-1d137d507a04/9326e659-781d-4b90-89b2-106c1bf54c18.png",
        admin: { name: "Admin5", photo: "https://png.pngtree.com/png-clipart/20230408/original/pngtree-admin-of-female-job-vacancies-png-image_9037122.png" },  
        type : "Budget-Friendly" ,
        destination: "Shiraz", 
        startPlace : "Yazd",
        transportation : "Plane",
         returnDate : "2023-10-25",
         travellers:12,
      }, 
      
      {  
        id: 3,  
        name: "Adventure Trip4",  
        date: "2024-7-22",  
        photo: "https://cdn.mashreghnews.ir/d/2021/07/06/4/3192979.jpg",
        destination: "sari", 
        admin: { name: "Admin5", photo: "https://png.pngitem.com/pimgs/s/111-1114718_transparent-sleep-icon-png-person-icon-circle-png.png" },   
        type : "fancy", 
        startPlace : "Tehran",
        transportation : "Bus",
         returnDate : "2023-12-23",
         travellers:2,
      }, 
      {  
        id: 3,  
        name: "Adventure Trip4",  
        date: "2024-4-22",  
        photo: "https://cdn.mashreghnews.ir/d/2021/07/06/4/3192979.jpg",
        destination: "sari", 
        admin: { name: "Admin5", photo: "https://png.pngitem.com/pimgs/s/111-1114718_transparent-sleep-icon-png-person-icon-circle-png.png" },   
        type : "fancy", 
        startPlace : "Tehran",
        transportation : "Bus",
         returnDate : "2023-12-23",
         travellers:2,
      },  
      {  
        id: 3,  
        name: "Adventure Trip4",  
        date: "2024-4-22",  
        photo: "https://cdn.mashreghnews.ir/d/2021/07/06/4/3192979.jpg",
        destination: "sari", 
        admin: { name: "Admin5", photo: "https://png.pngitem.com/pimgs/s/111-1114718_transparent-sleep-icon-png-person-icon-circle-png.png" },   
        type : "fancy", 
        startPlace : "Tehran",
        transportation : "Bus",
         returnDate : "2023-12-23",
         travellers:2,
      },  
      {  
        id: 3,  
        name: "Adventure Trip4",  
        date: "2024-4-22",  
        photo: "https://cdn.mashreghnews.ir/d/2021/07/06/4/3192979.jpg",
        destination: "sari", 
        admin: { name: "Admin5", photo: "https://png.pngitem.com/pimgs/s/111-1114718_transparent-sleep-icon-png-person-icon-circle-png.png" },   
        type : "fancy", 
        startPlace : "Tehran",
        transportation : "Bus",
         returnDate : "2023-12-23",
         travellers:2,
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
        returnDate : "2023-12-21",
        travellers:6,
      }, 
      {  
        id: 5,  
        name: "Winter Trip 3",  
        date: "2023-12-20",  
        photo: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGYtNDAtbHVrZXN0YWNrcG9vbGUtc2tpLXNsb3BlLmpwZw.jpg",
        destination: "Mazandaran",  
        admin: { name: "Admin5", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz8eSw47BxCpB5qcTaEsA_U7poqHaCDa0ZAQ&s" }, 
        type : "Budget-Friendly" ,
        startPlace : "Babol",
        transportation : "Train",
        returnDate : "2023-12-21",
        travellers:6,
      }, 
      {  
        id: 5,  
        name: "Winter Trip2 ",  
        date: "2023-12-20",  
        photo: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGYtNDAtbHVrZXN0YWNrcG9vbGUtc2tpLXNsb3BlLmpwZw.jpg",
        destination: "Mazandaran",  
        admin: { name: "Admin5", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz8eSw47BxCpB5qcTaEsA_U7poqHaCDa0ZAQ&s" }, 
        type : "Budget-Friendly" ,
        startPlace : "Babol",
        transportation : "Train",
        returnDate : "2023-12-21",
        travellers:6,
      }, 
      {  
        id: 5,  
        name: "Winter Trip20 ",  
        date: "2023-12-20",  
        photo: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGYtNDAtbHVrZXN0YWNrcG9vbGUtc2tpLXNsb3BlLmpwZw.jpg",
        destination: "Mazandaran",  
        admin: { name: "Admin5", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz8eSw47BxCpB5qcTaEsA_U7poqHaCDa0ZAQ&s" }, 
        type : "Budget-Friendly" ,
        startPlace : "Babol",
        transportation : "Train",
        returnDate : "2023-12-21",
        travellers:106,
      }, 
      {  
        id: 4,  
        name: "City Trip",  
        date: "2024-4-15",  
        photo: "https://plus.unsplash.com/premium_photo-1697729905164-f61ad5207758?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVocmFufGVufDB8fDB8fHww",
        destination: "Tehran",  
        admin: { name: "Admin5", photo: "https://clipart-library.com/2023/Admin-Profile-Vector-PNG-Clipart.png" }, 
        type : "Budget-Friendly" , 
        startPlace : "Isfahan",
        transportation : "Car",
         returnDate : "2023-11-27",
         travellers:7,
      }, 
      {  
        id: 4,  
        name: "City Trip",  
        date: "2024-7-15",  
        photo: "https://plus.unsplash.com/premium_photo-1697729905164-f61ad5207758?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVocmFufGVufDB8fDB8fHww",
        destination: "Tehran",  
        admin: { name: "Admin5", photo: "https://clipart-library.com/2023/Admin-Profile-Vector-PNG-Clipart.png" }, 
        type : "Budget-Friendly" , 
        startPlace : "Isfahan",
        transportation : "Car",
         returnDate : "2023-11-27",
         travellers:50,
      }, 
      {  
        id: 4,  
        name: "City Trip--",  
        date: "2024-11-01",  
        photo: "https://plus.unsplash.com/premium_photo-1697729905164-f61ad5207758?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVocmFufGVufDB8fDB8fHww",
        destination: "Tehran",  
        admin: { name: "Admin5", photo: "https://clipart-library.com/2023/Admin-Profile-Vector-PNG-Clipart.png" }, 
        type : "Budget-Friendly" , 
        startPlace : "Isfahan",
        transportation : "Car",
         returnDate : "2023-11-27",
         travellers:30,
      }, 
      {  
        id: 3,  
        name: "Adventure Trip--",  
        date: "2024-8-20",  
        photo: "https://cdn.mashreghnews.ir/d/2021/07/06/4/3192979.jpg",
        destination: "sari", 
        admin: { name: "Admin5", photo: "https://png.pngitem.com/pimgs/s/111-1114718_transparent-sleep-icon-png-person-icon-circle-png.png" },   
        type : "fancy", 
        startPlace : "Tehran",
        transportation : "Bus",
         returnDate : "2023-12-23",
         travellers:30,
      }, 
      {  
        id: 3,  
        name: "Adventure Trip5",  
        date: "2024-11-20",  
        photo: "https://cdn.mashreghnews.ir/d/2021/07/06/4/3192979.jpg",
        destination: "sari", 
        admin: { name: "Admin5", photo: "https://png.pngitem.com/pimgs/s/111-1114718_transparent-sleep-icon-png-person-icon-circle-png.png" },   
        type : "fancy", 
        startPlace : "Tehran",
        transportation : "Bus",
         returnDate : "2024-10-23",
         travellers:30,
      },  
      {  
        id: 3,  
        name: "Adventure Trip--",  
        date: "2024-11-20",  
        photo: "https://cdn.mashreghnews.ir/d/2021/07/06/4/3192979.jpg",
        destination: "sari", 
        admin: { name: "Admin5", photo: "https://png.pngitem.com/pimgs/s/111-1114718_transparent-sleep-icon-png-person-icon-circle-png.png" },   
        type : "fancy", 
        startPlace : "Tehran",
        transportation : "Bus",
         returnDate : "2024-10-23",
         travellers:30,
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
        return <FaCarSide style={{ marginRight: '1.5px' }} />;  
      default:  
        return null;  
    }  
  };
  const currentDate = new Date();  
  const currentYear = currentDate.getFullYear();  
  const currentMonth = currentDate.getMonth();   

  const settings = {  
    dots: true,  
    infinite: true,  
    speed: 500,  
    slidesToShow: 3,  
    slidesToScroll: 1, 
    centerMode: true, 
               
    centerPadding: '200px', 
    
    
    
   
    
    responsive: [  
      {  
        breakpoint: 1024,  
        settings: {  
          slidesToShow: 2,  
          slidesToScroll: 1,
          centerPadding: '0px'  
        }  
      },  
      {  
        breakpoint: 600,  
        settings: {  
          slidesToShow: 1,  
          slidesToScroll: 1,  
        }  
      }  
    ]  
  };  

  return ( 

    <div className="tour-list-container"> 
    <h1>Popular Trips</h1>  
    <div className="tour-list">  
        {tours  
            .sort((a, b) => b.travellers - a.travellers)  
            .slice(0, 5)  
            .map((tour) => (  
            <div key={tour.id} className="tour-card">  
                <img src={tour.photo} alt={tour.name} className="tour-image" />  
                <div className="tour-info">  
                    <h2 className="tour-name">{tour.name}</h2>  
                    <p className="tour-route">  
                        {tour.startPlace} {getTransportationIcon(tour.transportation)} {tour.destination}  
                    </p>  
                    <p className="tour-dates" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>  
                        <FaRegCalendar style={{ marginRight: '1.5px' }} />  
                        <span>{formatDate(tour.date)}</span>  
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
                            <img src={tour.admin.photo} alt={`${tour.admin.name} profile`} className="admin-photo" />  
                            {tour.admin.name}  
                        </p>  
                    )}  
                </div>  
            </div>  
        ))}  
        {/* ------ */}
         

        <div className="tour-list-container">  
          <h1>Upcoming Trips</h1>

          <div >  
        <Slider {...settings}>  
        {tours.filter(tour => {  
            const tourDate = new Date(tour.date);  
            return tourDate.getFullYear() === currentYear && tourDate.getMonth() === currentMonth;  
        }).map((tour) => (  
            <div key={tour.id} className="tour-card">  
                <img src={tour.photo} alt={`Image of ${tour.name}`} className="tour-image" />  
                <div className="tour-info">  
                    <h2 className="tour-name">{tour.name}</h2>  
                    <p className="tour-route">  
                        {tour.startPlace} {getTransportationIcon(tour.transportation)} {tour.destination}  
                    </p>  
                    <p className="tour-dates">  
                        <FaRegCalendar style={{ marginRight: '1.5px' }} aria-hidden="true" />  
                        <span>{formatDate(tour.date)}</span>  
                    </p>  
                    <p className="tour-length" style={{ textAlign: 'center' }}>  
                        <FaUndoAlt style={{ marginRight: '1.5px' }} aria-hidden="true" />  
                        {formatDate(tour.returnDate)}  
                    </p>  
                    <span className={`tour-type ${tour.type}`}>  
                        <GrMoney aria-hidden="true" /> {tour.type.charAt(0).toUpperCase() + tour.type.slice(1)}  
                    </span>  
                    {tour.admin && (  
                        <p className="tour-admin">  
                            <img src={tour.admin.photo} alt={`Profile of ${tour.admin.name}`} className="admin-photo" />  
                            {tour.admin.name}  
                        </p>  
                    )}  
                </div>  
            </div>  
        ))}  
</Slider>  
</div>
</div>

{/* ----------- */}
        



<div className="tour-list-container">  
          <h1>Fancy Trips</h1>
        <Slider {...settings}>  
        {tours.filter(tour=>tour.type==="fancy").map((tour) => (  
            <div key={tour.id} className="tour-card">  
                <img src={tour.photo} alt={`Image of ${tour.name}`} className="tour-image" />  
                <div className="tour-info">  
                    <h2 className="tour-name">{tour.name}</h2>  
                    <p className="tour-route">  
                        {tour.startPlace} {getTransportationIcon(tour.transportation)} {tour.destination}  
                    </p>  
                    <p className="tour-dates">  
                        <FaRegCalendar style={{ marginRight: '1.5px' }} aria-hidden="true" />  
                        <span>{formatDate(tour.date)}</span>  
                    </p>  
                    <p className="tour-length" style={{ textAlign: 'center' }}>  
                        <FaUndoAlt style={{ marginRight: '1.5px' }} aria-hidden="true" />  
                        {formatDate(tour.returnDate)}  
                    </p>  
                    <span className={`tour-type ${tour.type}`}>  
                        <GrMoney aria-hidden="true" /> {tour.type.charAt(0).toUpperCase() + tour.type.slice(1)}  
                    </span>  
                    {tour.admin && (  
                        <p className="tour-admin">  
                            <img src={tour.admin.photo} alt={`Profile of ${tour.admin.name}`} className="admin-photo" />  
                            {tour.admin.name}  
                        </p>  
                    )}  
                </div>  
            </div>  
        ))}  
</Slider>  
</div>
{/* --------------- */}



<div className="tour-list-container">  
          <h1>Budget-Friendly Trips</h1>
        <Slider {...settings}>  
        {tours.filter(tour=>tour.type==="Budget-Friendly").map((tour) => (  
            <div key={tour.id} className="tour-card">  
                <img src={tour.photo} alt={`Image of ${tour.name}`} className="tour-image" />  
                <div className="tour-info">  
                    <h2 className="tour-name">{tour.name}</h2>  
                    <p className="tour-route">  
                        {tour.startPlace} {getTransportationIcon(tour.transportation)} {tour.destination}  
                    </p>  
                    <p className="tour-dates">  
                        <FaRegCalendar style={{ marginRight: '1.5px' }} aria-hidden="true" />  
                        <span>{formatDate(tour.date)}</span>  
                    </p>  
                    <p className="tour-length" style={{ textAlign: 'center' }}>  
                        <FaUndoAlt style={{ marginRight: '1.5px' }} aria-hidden="true" />  
                        {formatDate(tour.returnDate)}  
                    </p>  
                    <span className={`tour-type ${tour.type}`}>  
                        <GrMoney aria-hidden="true" /> {tour.type.charAt(0).toUpperCase() + tour.type.slice(1)}  
                    </span>  
                    {tour.admin && (  
                        <p className="tour-admin">  
                            <img src={tour.admin.photo} alt={`Profile of ${tour.admin.name}`} className="admin-photo" />  
                            {tour.admin.name}  
                        </p>  
                    )}  
                </div>  
            </div>  
        ))}  
</Slider>  
</div>
{/* ------------- */}




<div className="tour-list-container">  
          <h1>Quick Trips</h1>
        <Slider {...settings}>  
        {tours.filter(tour => {  
            const tourDate = new Date(tour.date);
            const tourDateback=new Date(tour.returnDate);
            return tourDate.getFullYear() === tourDateback.getFullYear() && tourDate.getMonth() === tourDateback.getMonth() && tourDate.getDay()-tourDateback.getDay()<=2;  
        }).map((tour) => (  
            <div key={tour.id} className="tour-card">  
                <img src={tour.photo} alt={`Image of ${tour.name}`} className="tour-image" />  
                <div className="tour-info">  
                    <h2 className="tour-name">{tour.name}</h2>  
                    <p className="tour-route">  
                        {tour.startPlace} {getTransportationIcon(tour.transportation)} {tour.destination}  
                    </p>  
                    <p className="tour-dates">  
                        <FaRegCalendar style={{ marginRight: '1.5px' }} aria-hidden="true" />  
                        <span>{formatDate(tour.date)}</span>  
                    </p>  
                    <p className="tour-length" style={{ textAlign: 'center' }}>  
                        <FaUndoAlt style={{ marginRight: '1.5px' }} aria-hidden="true" />  
                        {formatDate(tour.returnDate)}  
                    </p>  
                    <span className={`tour-type ${tour.type}`}>  
                        <GrMoney aria-hidden="true" /> {tour.type.charAt(0).toUpperCase() + tour.type.slice(1)}  
                    </span>  
                    {tour.admin && (  
                        <p className="tour-admin">  
                            <img src={tour.admin.photo} alt={`Profile of ${tour.admin.name}`} className="admin-photo" />  
                            {tour.admin.name}  
                        </p>  
                    )}  
                </div>  
            </div>  
        ))}  
</Slider>  
</div>
{/* ---- */}


<div className="tour-list-container">  
          <h1>Spring Trips</h1>
        <Slider {...settings}>  
        {tours.filter(tour => {  
            const tourDate = new Date(tour.date);  
            return tourDate.getMonth() === 0|| tourDate.getMonth() === 1 || tourDate.getMonth() === 2;  
        }).map((tour) => (  
            <div key={tour.id} className="tour-card">  
                <img src={tour.photo} alt={`Image of ${tour.name}`} className="tour-image" />  
                <div className="tour-info">  
                    <h2 className="tour-name">{tour.name}</h2>  
                    <p className="tour-route">  
                        {tour.startPlace} {getTransportationIcon(tour.transportation)} {tour.destination}  
                    </p>  
                    <p className="tour-dates">  
                        <FaRegCalendar style={{ marginRight: '1.5px' }} aria-hidden="true" />  
                        <span>{formatDate(tour.date)}</span>  
                    </p>  
                    <p className="tour-length" style={{ textAlign: 'center' }}>  
                        <FaUndoAlt style={{ marginRight: '1.5px' }} aria-hidden="true" />  
                        {formatDate(tour.returnDate)}  
                    </p>  
                    <span className={`tour-type ${tour.type}`}>  
                        <GrMoney aria-hidden="true" /> {tour.type.charAt(0).toUpperCase() + tour.type.slice(1)}  
                    </span>  
                    {tour.admin && (  
                        <p className="tour-admin">  
                            <img src={tour.admin.photo} alt={`Profile of ${tour.admin.name}`} className="admin-photo" />  
                            {tour.admin.name}  
                        </p>  
                    )}  
                </div>  
            </div>  
        ))}  
</Slider>  
</div>
{/* ------ */}


<div className="tour-list-container">  
          <h1>Summer Trips</h1>
        <Slider {...settings}>  
        {tours.filter(tour => {  
            const tourDate = new Date(tour.date);  
            return tourDate.getMonth() === 3|| tourDate.getMonth() === 4 || tourDate.getMonth() === 5;  
        }).map((tour) => (  
            <div key={tour.id} className="tour-card">  
                <img src={tour.photo} alt={`Image of ${tour.name}`} className="tour-image" />  
                <div className="tour-info">  
                    <h2 className="tour-name">{tour.name}</h2>  
                    <p className="tour-route">  
                        {tour.startPlace} {getTransportationIcon(tour.transportation)} {tour.destination}  
                    </p>  
                    <p className="tour-dates">  
                        <FaRegCalendar style={{ marginRight: '1.5px' }} aria-hidden="true" />  
                        <span>{formatDate(tour.date)}</span>  
                    </p>  
                    <p className="tour-length" style={{ textAlign: 'center' }}>  
                        <FaUndoAlt style={{ marginRight: '1.5px' }} aria-hidden="true" />  
                        {formatDate(tour.returnDate)}  
                    </p>  
                    <span className={`tour-type ${tour.type}`}>  
                        <GrMoney aria-hidden="true" /> {tour.type.charAt(0).toUpperCase() + tour.type.slice(1)}  
                    </span>  
                    {tour.admin && (  
                        <p className="tour-admin">  
                            <img src={tour.admin.photo} alt={`Profile of ${tour.admin.name}`} className="admin-photo" />  
                            {tour.admin.name}  
                        </p>  
                    )}  
                </div>  
            </div>  
        ))}  
</Slider>  
</div>
{/* ------------ */}

<div className="tour-list-container">  
          <h1>Autumn Trips</h1>
        <Slider {...settings}>  
        {tours.filter(tour => {  
            const tourDate = new Date(tour.date);  
            return tourDate.getMonth() === 6|| tourDate.getMonth() === 7 || tourDate.getMonth() === 8;  
        }).map((tour) => (  
            <div key={tour.id} className="tour-card">  
                <img src={tour.photo} alt={`Image of ${tour.name}`} className="tour-image" />  
                <div className="tour-info">  
                    <h2 className="tour-name">{tour.name}</h2>  
                    <p className="tour-route">  
                        {tour.startPlace} {getTransportationIcon(tour.transportation)} {tour.destination}  
                    </p>  
                    <p className="tour-dates">  
                        <FaRegCalendar style={{ marginRight: '1.5px' }} aria-hidden="true" />  
                        <span>{formatDate(tour.date)}</span>  
                    </p>  
                    <p className="tour-length" style={{ textAlign: 'center' }}>  
                        <FaUndoAlt style={{ marginRight: '1.5px' }} aria-hidden="true" />  
                        {formatDate(tour.returnDate)}  
                    </p>  
                    <span className={`tour-type ${tour.type}`}>  
                        <GrMoney aria-hidden="true" /> {tour.type.charAt(0).toUpperCase() + tour.type.slice(1)}  
                    </span>  
                    {tour.admin && (  
                        <p className="tour-admin">  
                            <img src={tour.admin.photo} alt={`Profile of ${tour.admin.name}`} className="admin-photo" />  
                            {tour.admin.name}  
                        </p>  
                    )}  
                </div>  
            </div>  
        ))}  
</Slider>  
</div>
{/* ---------- */}


<div className="tour-list-container">  
          <h1>Winter Trips</h1>
        <Slider {...settings}>  
        {tours.filter(tour => {  
            const tourDate = new Date(tour.date);  
            return tourDate.getMonth() === 9|| tourDate.getMonth() === 10 || tourDate.getMonth() === 11;  
        }).map((tour) => (  
            <div key={tour.id} className="tour-card">  
                <img src={tour.photo} alt={`Image of ${tour.name}`} className="tour-image" />  
                <div className="tour-info">  
                    <h2 className="tour-name">{tour.name}</h2>  
                    <p className="tour-route">  
                        {tour.startPlace} {getTransportationIcon(tour.transportation)} {tour.destination}  
                    </p>  
                    <p className="tour-dates">  
                        <FaRegCalendar style={{ marginRight: '1.5px' }} aria-hidden="true" />  
                        <span>{formatDate(tour.date)}</span>  
                    </p>  
                    <p className="tour-length" style={{ textAlign: 'center' }}>  
                        <FaUndoAlt style={{ marginRight: '1.5px' }} aria-hidden="true" />  
                        {formatDate(tour.returnDate)}  
                    </p>  
                    <span className={`tour-type ${tour.type}`}>  
                        <GrMoney aria-hidden="true" /> {tour.type.charAt(0).toUpperCase() + tour.type.slice(1)}  
                    </span>  
                    {tour.admin && (  
                        <p className="tour-admin">  
                            <img src={tour.admin.photo} alt={`Profile of ${tour.admin.name}`} className="admin-photo" />  
                            {tour.admin.name}  
                        </p>  
                    )}  
                </div>  
            </div>  
        ))}  
</Slider>  
</div>



<div className="tour-list-container">  
          <h1>All Trips</h1>
        <Slider {...settings}>  
        {tours.map((tour) => (  
            <div key={tour.id} className="tour-card">  
                <img src={tour.photo} alt={`Image of ${tour.name}`} className="tour-image" />  
                <div className="tour-info">  
                    <h2 className="tour-name">{tour.name}</h2>  
                    <p className="tour-route">  
                        {tour.startPlace} {getTransportationIcon(tour.transportation)} {tour.destination}  
                    </p>  
                    <p className="tour-dates">  
                        <FaRegCalendar style={{ marginRight: '1.5px' }} aria-hidden="true" />  
                        <span>{formatDate(tour.date)}</span>  
                    </p>  
                    <p className="tour-length" style={{ textAlign: 'center' }}>  
                        <FaUndoAlt style={{ marginRight: '1.5px' }} aria-hidden="true" />  
                        {formatDate(tour.returnDate)}  
                    </p>  
                    <span className={`tour-type ${tour.type}`}>  
                        <GrMoney aria-hidden="true" /> {tour.type.charAt(0).toUpperCase() + tour.type.slice(1)}  
                    </span>  
                    {tour.admin && (  
                        <p className="tour-admin">  
                            <img src={tour.admin.photo} alt={`Profile of ${tour.admin.name}`} className="admin-photo" />  
                            {tour.admin.name}  
                        </p>  
                    )}  
                </div>  
            </div>  
           
        ))} 
         </Slider>  
            </div>
           </div>
           </div>






    
    
    
  );  
};  

export default TourList;  