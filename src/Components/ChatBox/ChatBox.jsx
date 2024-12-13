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

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messageData.map((item) => {
          return <MessageBox messageItems={item} />;
        })}
      </div>

      <div className="send-box">
        <TextField
          //   value={}
          variant="outlined"
          name="textMessage"
          onChange={handleChange}
          multiline
          //   rows={2}
          required
          fullWidth
          sx={{ backgroundColor: "white", borderRadius: "0" }}
        />
        <Button
          type="submit"
          sx={{
            backgroundColor: "gray",
            color: "white",
            borderRadius: "0",
          }}
        >
          send
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
