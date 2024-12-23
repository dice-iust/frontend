import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import "./Trips_MainPage.scss";
import { GiCash } from "react-icons/gi";
import { BsFillChatFill } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { TbHomeFilled } from "react-icons/tb";
import axios from "../../api/axios.js";
import { useParams, useLocation } from "react-router-dom";
import { FaCarSide } from "react-icons/fa6";
import { FaPlane } from "react-icons/fa";
import { TbTrain } from "react-icons/tb";
import { TbBus } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa";
import Travelsnav from "../tourspage/categories_nav.jsx";
import Footer from "../tourspage/footer.jsx";
import RequestPage from "./requests/requests.jsx";
import Userspage from "./Users/users.jsx";
import { IoAddOutline } from "react-icons/io5";
import PlannerPage from "../BudgetPlanner/BudgetPlanner.jsx";
import QApage from "../ChatBox/ChatBox.jsx";
import { FaRegHand } from "react-icons/fa6";
import { GiConfirmed } from "react-icons/gi";
import { VscError } from "react-icons/vsc";
 

const Trips_MainPage = () => {
  const location = useLocation();
  const [showQA, setShowQA] = useState(false);
  const [showrequests, setShowrequests] = useState(false);
  const [showmain, setshowmain] = useState(() => {  
    if (location.state && location.state.showmain !== undefined) {  
      return location.state.showmain;  
    }  
    return true; 
  });    
  const [showplanner, setShowplanner] = useState(location.state?.showplanner || false);    
  const name = useParams();

  const handlemain = () => {
    setshowmain(true);
    setShowplanner(false);
    setShowQA(false);
    setShowrequests(false);
  };

  const handleplanner = () => {
    setshowmain(false);
    setShowplanner(true);
    setShowQA(false);
    setShowrequests(false);
  };

  const handleQA = () => {
    setshowmain(false);
    setShowplanner(false);
    setShowQA(true);
    setShowrequests(false);
  };

  const handlerequests = () => {
    setshowmain(false);
    setShowplanner(false);
    setShowQA(false);
    setShowrequests(true);
  };

  
  const user = {
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s",
    name: "John Doe",
    role: "admin",
  };

  const getTransportationIcon = (transportation) => {
    switch (transportation.toLowerCase()) {
      case "train":
        return <TbTrain className="moveicon-transport" />;
      case "bus":
        return <TbBus className="moveicon-transport" />;
      case "plane":
        return <FaPlane className="moveicon-transport" />;
      case "car":
        return <FaCarSide className="moveicon-transport" />;
      default:
        return null;
    }
  };

  const { tourname } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [iscode, setcode] = useState(null);
  const [passcode, setPasscode] = useState("");

  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isPart, setIsPart] = useState(true);
  const [isshow, setIsshow] = useState(false);
  const [isPrivate, SetIsPrivate] = useState("Private");
  const [iscorrect, SetIscorrect] = useState("");
  const [iswrong, SetIswrong] = useState("");

  useEffect(() => {
    // let isMounted = true; // We keep track of mounted component
    const fetchTripData = async () => {
      if (!tourname) {
        setError("Tour name is required.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `https://triptide.pythonanywhere.com/travels/single/`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
            params: { travel_name: tourname },
          }
        );
        setTripData(response.data);
        setIsshow(response.data.is_part)
        if (response.data.code) {
          setIsAdmin(true);
          setcode(response.data.code);
        }
        setIsPart(response.data.is_part);
        SetIsPrivate(response.data.travels.travel_is.status, "status");
      } catch (err) {
        if (err.response?.status === 403) {
          const is_part = err.response.data.is_part;
          setIsPart(is_part);
          setIsshow(is_part);
          setError(
            `This trip is private. Enter the passcode and wait for your request to be accepted!`
          );
        } else {
          setError(
            err.response?.data?.detail ||
              "An error occurred while fetching trip data."
          );
        }
      } finally {
        // if (isMounted) {
        setLoading(false);
        // }
      }
    };

    fetchTripData();

    // Cleanup function to set isMounted to false when unmounted
    // return () => {
    //     isMounted = false;
    // };
  }, [tourname]);

  const handleJoin = (e) => {
    const { value } = e.target;
    setPasscode(value);
  };
  const handleJoinRequest = (e) => {
    e.preventDefault();
    postUserRequest();
  };

  const postUserRequest = async () => {
    const requestObj = {
      key: passcode,
      name: name.tourname,
    };

    try {
      const response = await axios.post(
        "https://triptide.pythonanywhere.com/travels/adduser/",
        JSON.stringify(requestObj),
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {  
        SetIscorrect("Request sent successfully!");  
        setPasscode(""); 
        setTimeout(() => {
          SetIscorrect("");
        }, 3000);  
      }  
      if (response.status==403)
      {
        SetIswrong("Wrong Passcode")
      }

    } catch (error) {
      console.error("Error updating profile:", error);
      SetIswrong("Wrong Passcode")
      setTimeout(() => {
        SetIswrong("");
      }, 3000);
    }
  };

  return (
    <div className="trippage">
      <Travelsnav />

      <div className="main-page">
        <div className="sidebar">
          <ul className="menu">
            <li
              className={`menu-item  ${showmain ? "active" : ""}`}
              onClick={handlemain}
            >
              <TbHomeFilled size={25} className="moveiconMain" />
              Main
            </li>
            {isAdmin && (
              <li
                className={`menu-item  ${showrequests ? "active" : ""}`}
                onClick={handlerequests}
              >
                <IoMdPersonAdd size={25} className="moveiconadd" /> Requests
              </li>
            )}
            {isshow && (  
            <>  
              <li className={`menu-item  ${showQA ? 'active' : ''}`} onClick={handleQA}><BsFillChatFill size={22} className='moveiconchat' /> Chat</li>
              <li className={`menu-item  ${showplanner ? 'active' : ''}`} onClick={handleplanner}><GiCash size={25} /> Planner</li>
            </>  
          )}  
          </ul>
          {isshow && (  
            <> 
          <div className="profile">
            {tripData && (
              <img
                src={tripData.profile}
                alt="Profile"
                className="profile-pic"
              />
            )}
            {tripData && <span className="profile-name">{tripData.name}</span>}
          </div>
           </>
          )}
        </div>
     

        {showrequests ? (  
            <RequestPage code={iscode} travelState={tripData.travels.travel_is.status}/>  
        ) 
        :
        showplanner? (
            <PlannerPage tourname={tourname} />
        )
        :
        showQA? (
            <QApage tourname={tourname} />
        )
        :
         (  
          showmain && (
            <div className="trip-container">
              {isPart ? null : (
                <>
                  {/* <div class="circle-icon">  
                    <div class="hand-icon">  
                        <FaRegHand />  
                    </div>  
                </div>   */}
                  <br/>
                  <Button
                    sx={{
                      marginRight: "10px",
                      marginTop: "8px",
                      backgroundColor : "#22487a",
                      "&:hover": {  
                        backgroundColor: "rgb(234, 110, 12)", 
                        },  
                    }}
                    variant="contained"
                    type="submit"
                    onClick={handleJoinRequest}
                  >
                    Join <IoAddOutline />
                  </Button>
                  {isPrivate == "Public" ? null : (
                    <>
                      <TextField
                        label="Passcode"
                        variant="outlined"
                        type="text"
                        name="passcode"
                        onChange={handleJoin}
                      />
                    </>
                  )}
                   {iscorrect && (  
                    <div style={{  
                      border: "1px solid #4caf50",  
                      backgroundColor: "#e8f5e9",  
                      color: "#2e7d32",  
                      padding: "16px",  
                      borderRadius: "5px",  
                      margin: "20px 0",  
                      fontFamily: "Arial, sans-serif",  
                      width: "300px"  
                    }}>  
                        <p style={{ margin: 0, fontWeight: "bold" }}><GiConfirmed /> {iscorrect}</p>  
                    </div>  
                  )} 
                  {iswrong && (  
                    <div style={{  
                      border: "1px solid #f44336",
                      backgroundColor: "#ffebee",   
                      color: "#f44336", 
                      padding: "16px",  
                      borderRadius: "5px", 
                      margin: "20px 0", 
                      fontFamily: "Arial, sans-serif", 
                      width: "200px"  
                    }}>  
                        <p style={{ margin: 0, fontWeight: "bold" }}><VscError /> {iswrong}</p>  
                    </div>  
                  )}   
                </>
              )}

              {error && tripData === null ? (
                <>
                  <div style={{  
                    border: "1px solid #f44336",
                    backgroundColor: "#ffebee",   
                    color: "#f44336", 
                    padding: "16px",  
                    borderRadius: "5px", 
                    margin: "20px 0", 
                    fontFamily: "Arial, sans-serif", 
                    width : "700px"
                  }}>  
                    <p style={{ margin: 0, fontWeight: "bold" }}>{error}</p>  
                  </div>  
                </>
              ) : tripData ? ( // Check if tripData is available to render
                <>
                  <div className="trip-header">
                    <img
                      className="trip-photo"
                      src={tripData.travels.travel_is.image_url}
                      alt={`Photo of ${tripData.travels.travel_is.name}`}
                    />
                    <div className="trip-info">
                      <h2 className="tour-name">
                        {tripData.travels.travel_is.name}
                      </h2>
                      <div className="trip-meta">
                        <p
                          className={`mode ${tripData.travels.travel_is.mode}`}
                        >
                          {tripData.travels.travel_is.mode}
                        </p>
                        <p
                          className={`status ${tripData.travels.travel_is.status}`}
                        >
                          {tripData.travels.travel_is.status}
                        </p>
                        <p className="capacity">
                          {tripData.travels.travel_is.travellers} participants
                        </p>
                        <p className="locations">
                          {tripData.travels.travel_is.start_place}{" "}
                          {getTransportationIcon(
                            tripData.travels.travel_is.transportation
                          )}{" "}
                          {tripData.travels.travel_is.destination}
                        </p>
                        <p className="dates">
                          {tripData.travels.travel_is.start_date}{" "}
                          <FaArrowRight className="moveicon-arrow" />{" "}
                          {tripData.travels.travel_is.end_date}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p>Loading...</p> // Optional loading state
              )}
              <Userspage />
            </div>
          )
        )}
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default Trips_MainPage;
