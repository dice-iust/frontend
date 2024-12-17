import React from "react";  
import { Typography } from "@mui/material";  
import "./MessageBox.scss";  

const MessageBox = ({ messageItems }) => {  
  // Determine if the message is sent or received  
  const isSent = messageItems.isAdmin; // true if sent (admin), false if received (user)  
  
  return (  
    <div className={`message-container ${isSent ? "sent" : "received"}`}>  
      {/* Profile picture is on the left for received messages */}  
      {!isSent &&   
        <img   
          src={messageItems.profilePic}   
          alt={`${messageItems.username}'s profile`}   
          className="profile-pic"   
        />  
      }  
      
      <div className={`textMessage ${isSent ? "sent" : "received"}`}>  
        <Typography   
          variant="subtitle2"   
          sx={{ color: isSent ? "rgb(234, 110, 12)" : "#22487a", fontWeight: isSent ? "bold" : "normal" }}  
        >  
          {messageItems.username}  
        </Typography>  
        <Typography variant="body1">{messageItems.textMessage}</Typography>  
        {/* Date alignment for received messages */}  
        <Typography className="date" variant="caption" sx={{ color: "gray" }}>  
          {messageItems.date}  
        </Typography>  
      </div>  

      {/* Profile picture is on the right for sent messages */}  
      {isSent &&   
        <img   
          src={messageItems.profilePic}   
          alt={`${messageItems.username}'s profile`}   
          className="profile-pic"   
        />  
      }  
    </div>  
  );  
};  

export default MessageBox;