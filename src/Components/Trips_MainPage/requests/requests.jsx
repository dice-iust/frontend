import "./requests.scss";
import React, { useState, useEffect } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";

const RequestsPage = (props) => {
  const { code, travelState } = props;
  const { tourname } = useParams();
  const [allRequests, setAllRequests] = useState(null);
  const [accept, setAccept] = useState(false);

  const getFormData = async () => {
    try {
      const response = await axios.get(
        "https://triptide.pythonanywhere.com/requests/",
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const foundItem = response?.data?.filter(
        (item) => item.travel_name === tourname
      );
      foundItem && setAllRequests(foundItem);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getFormData();
  }, []);
  const [showCode, setShowCode] = useState(false);
  const tripCode = code;

  const handleConfirm = (username) => {
    const requestObj = {
      is_accept: true,
      travel_name: tourname,
      user_name: username,
    };

    try {
      const response = axios.post(
        "https://triptide.pythonanywhere.com/requests/",
        JSON.stringify(requestObj),
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDelete = (username) => {
    const requestObj = {
      is_accept: false,
      travel_name: tourname,
      user_name: username,
    };

    try {
      const response = axios.post(
        "https://triptide.pythonanywhere.com/requests/",
        JSON.stringify(requestObj),
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const toggleShowCode = () => {
    setShowCode((prev) => !prev);
  };

  return (
    <div className="requests-page">
      <div className="header-container">
        <h1>User Requests</h1>
        {travelState === "Private" ? (
          <div className="trip-code-container">
            <div className="box">
              <p>
                {" "}
                Trip code:
                <span className="trip-code">
                  {showCode ? tripCode : "******"}
                </span>
                <button className="eye-button" onClick={toggleShowCode}>
                  {showCode ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </p>
              {showCode && (
                <p className="errorcode">
                  Anyone with this code can join this trip.
                </p>
              )}
            </div>
          </div>
        ) : null}
      </div>

      <div className="requests-container">
        {allRequests?.map((request) => (
          <div className="request-card" key={request.user_request.user_name}>
            <div className="card-content">
              <img
                src={request.user_request.phrofile_image}
                alt={request.user_request.user_name}
                className="user-photo"
              />
              <div className="user-info">
                <h2 className="user-name">{request.user_request.user_name}</h2>
                <div className="button-group">
                  <button
                    className="confirm-button"
                    onClick={() =>
                      handleConfirm(request.user_request.user_name)
                    }
                  >
                    Confirm
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(request.user_request.user_name)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsPage;
