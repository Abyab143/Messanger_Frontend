import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import notification from "./notification.wav";

const socket = io.connect("https://messanger-luul.onrender.com/");

function Enter() {
  const [name, setname] = useState("");
  const [room, setroom] = useState("");
  const [chat, setchat] = useState(false);
  const music = new Audio(notification);
  const submit = () => {
    if (name !== "" && room !== "") {
      socket.emit("join_room", room);
      setchat(true);
      music.play();
    }
    else{
      alert("plesse enter input first");
    }
  };
  return (
    <>
      {!chat && (
        <div className="container_Enter">
          <h2>Welcome To Messanger</h2>
          <input
            type="text"
            placeholder="Enter Your name please"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="text"
            value={room}
            placeholder="Enter your Room Name please"
            onChange={(e) => setroom(e.target.value)}
          />
          <button id="btn" onClick={submit}>
            Join Chat
          </button>
        </div>
      )}
      {chat && <Chat name={name} room={room} socket={socket} />}
    </>
  );
}

export default Enter;
