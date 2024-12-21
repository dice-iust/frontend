import React, { useState } from "react";  
import { TextField, Button } from "@mui/material";  
import "./ChatBox.scss";  
import MessageBox from "./Components/MessageBox";  
import { messageData } from "../../../src/api/jsondata/planner"; 
import Ably from 'ably' ;
import axios from "../../api/axios";

const ChatBox = ({tourname}) => {  
  const [message, setMessage] = useState("");  
  const ably =new Ably.Realtime('w9hDjQ.bDJwDg:nV7gxEThhWT4clJqHv9K3syB3SQCDrkcgaoChiWmRQY');
  const channel =ably.channels.get(`travel_${tourname}`);
  const [error, setError] = useState(null);  
  const [loading, setLoading] = useState(true);  
  channel.subscribe('chat',(message)=>{
    console.log('Received: ',message.data);
  });
    // useEffect(() => {  
        const sendMessage = async (message,tourname,token) => {  
            if (!tourname) {  
                setError('Tour name is required.');  
                setLoading(false);  
                return;  
            }  
            try {  
                const response = await axios.post(`https://triptide.pythonanywhere.com/publish_message/`,{
                  message,travel_name: tourname
                }, {  
                    headers: {  
                        Authorization: token,  
                    },   
                });  
                console.log("data from back: ",response.data);
                // if (response.data.travels.travel_is.start_date) 
                // { 
                //     setIsAdmin(true);  
                //     setcode(response.data.code); 
                // }
                
                // setTripData(response.data);  
            }   
            catch (err) {    
              setError(err.response?.data?.detail || 'An error occurred while fetching trip data.');  
            }   
            finally {  
              setLoading(false);  
            }  
        };  
    
        // fetchTripData();   
    // }, [tourname]);

  const handleChange = (e) => {  
    setMessage(e.target.value);  
  };  

  const handleSendMessage = async (e) => {  
    e.preventDefault();
    if (message.trim()==='')  return;
      console.log("Sending message:", message);  
      await sendMessage(message,tourname,localStorage.getItem("token"));
      setMessage(""); // Clear the input after sending  
     
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