import React from "react";  
import { Typography } from "@mui/material";  
import "./MessageBox.scss";  

const MessageBox = (props) => {  
  const { messageItems } = props;  

  return (  
    <div className={`message-container ${messageItems.isAdmin ? "admin-message" : "user-message"}`} key={messageItems.id}>  
      <img src={messageItems.profilePic} alt="profile" />  
      <div className="textMessage">  
        {messageItems.isAdmin && (  
          <Typography variant="subtitle2" sx={{ color: "red", fontWeight: "bold" }}>  
            Admin  
          </Typography>  
        )}  
        <Typography variant="body1">{messageItems.textMessage}</Typography>  
        <Typography variant="caption" sx={{ color: "gray" }}>  
          {messageItems.date}  
        </Typography>  
      </div>  
    </div>  
  );  
};  

export default MessageBox;