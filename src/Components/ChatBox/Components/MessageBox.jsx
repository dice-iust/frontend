import React from "react";
import { Typography } from "@mui/material";
import "./MessageBox.scss";

const MessageBox = (props) => {
  const { messageItems } = props;

  return (
    <div className="message-container" key={messageItems.id}>
      <img src={messageItems.profilePic} alt="profile" />
      <div className="textMessage">
        {messageItems.isAdmin ? (
          <Typography sx={{ color: "gray" }}>Admin</Typography>
        ) : null}
        <Typography>{messageItems.textMessage}</Typography>
        <Typography sx={{ color: "gray" }}>{messageItems.date}</Typography>
      </div>
    </div>
  );
};

export default MessageBox;
