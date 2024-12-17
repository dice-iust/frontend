import React, { useState } from "react";  
import { TextField, Button } from "@mui/material";  
import "./ChatBox.scss";  
import MessageBox from "./Components/MessageBox";  
import { messageData } from "../../../src/api/jsondata/planner";  

const ChatBox = () => {  
  const [message, setMessage] = useState("");  

  const handleChange = (e) => {  
    const { value } = e.target;  
    setMessage(value);  
  };  

  const handleSendMessage = () => {  
    if (message.trim()) {  
      // Send the message (to be implemented)  
      console.log("Sending message:", message);  
      setMessage(""); // Clear the input after sending  
    }  
  };  

  return (  
    <div className="chat-container">  
      <div className="chat-messages">  
        {messageData.map((item, index) => (  
          <MessageBox key={index} messageItems={item} />  
        ))}  
      </div>  

      <div className="send-box">  
        <TextField  
          value={message}  
          variant="outlined"  
          name="textMessage"  
          onChange={handleChange}  
          multiline  
          rows={2}  
          required  
          fullWidth  
          placeholder="Type a message..."  
          sx={{   
            backgroundColor: "white",   
            borderRadius: "20px",   
            marginRight: "10px"   
          }}  
        />  
        <Button  
          onClick={handleSendMessage}  
          sx={{  
            backgroundColor: "#22487a", 
            color: "white",  
            borderRadius: "20px",  
            padding: "10px 20px",  
            "&:hover": {  
              backgroundColor: "rgb(234, 110, 12)", 
            },  
          }}  
        >  
          Send  
        </Button>  
      </div>  
    </div>  
  );  
};  

export default ChatBox;