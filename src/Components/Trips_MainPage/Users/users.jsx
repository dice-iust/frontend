import React, { useEffect, useState } from "react";
import "./users.scss"; // Make sure this path is correct
import axios from "../../../api/axios.js";
import { useParams } from "react-router-dom";

const UsersPage = () => {
  const { tourname } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

        // Log the entire response object for debugging
        //console.log(response.data);

        // Check if response has travels data
        if (response.data.travels?.travel_is?.start_date) {
          setIsAdmin(true);
        }

        setTripData(response.data);
      } catch (err) {
        console.error("Fetch error:", err); // Log the error for debugging
        if (err.response?.status === 403) {
          const is_part = err.response.data.is_part;
          setError(`Access forbidden. Is part: ${is_part}`);
        } else {
          setError(
            err.response?.data?.detail ||
              "An error occurred while fetching trip data."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTripData();
  }, [tourname]);

  // Render logic
  if (loading) {
    return <div className="loader"></div>; // Loader message
  }

  if (error) {
    return <div className="error"></div>; // Error message
  }

  // Ensure tripData and its structure are checked
  if (
    !tripData ||
    !tripData.travels ||
    !tripData.travels.users ||
    tripData.travels.users.length === 0
  ) {
    return <div className="no-data"></div>; // Handle case with no users
  }

  return (
    <div className="members-container">
      <h1>Travellers</h1>
      <div className="members-list">
        {tripData.travels.users.map((member) => (
          <div className="member-card" key={member.email}>
            <img
              className="member-photo"
              src={member.profile_image || "https://via.placeholder.com/100"}
              alt={`${member.user_name}'s photo`}
            />
            <div className="member-info">
              <h2>{member.user_name}</h2>
              <p>{member.bio || "No bio available."}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
