import React, { useEffect, useRef, useState } from "react";
import music from "./iphone.mp3"
function Chat({ name, room, socket }) {
  const [Message, setmessage] = useState("");
  const [Mesagelist, setMessagelist] = useState([]);
  const notify = new Audio(music);
  const handlemessage = async () => {
    if (Message !== "") {
      const messageData = {
        id: Math.random(),
        room: room,
        author: name,
        message: Message,
        time:
          (new Date(Date.now()).getHours() % 12) +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessagelist((list) => [...list, messageData]);
      notify.play();
      setmessage("");
    }
    else{
      alert("please enetr meessage first");
    }
  };

  useEffect(() => {
    const handleReceiveMsg = (data) => {
      setMessagelist((list) => [...list, data]);
    };
    socket.on("receive_message", handleReceiveMsg);
    return () => {
      socket.off("receive_message", handleReceiveMsg);
    };
  }, [socket]);

  const containRef = useRef(null);

  useEffect(() => {
    containRef.current.scrollTop = containRef.current.scrollHeight;
  }, [Mesagelist]);

  return (
    <>
      <div className="container">
        <h2>Welcome {name}</h2>
        <div className="container_chat">
          <div
            className="auto-scrolling-div"
            ref={containRef}
            style={{
              height: "450px",
              overflowY: "auto",
            }}
          >
            {Mesagelist.map((data) => (
              <div
                key={data.id}
                className="message_content"
                id={name == data.author ? "you" : "other"}
              >
                <div>
                  <div className="msg" id={name == data.author ? "y" : "b"}>
                    <p>{data.message}</p>
                  </div>
                  <div className="msg_detail">
                    <p>{data.author}</p>
                    <p>{data.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Enter Your Message..."
            value={Message}
            onChange={(e) => setmessage(e.target.value)}
            onKeyPress={(e) => {
              e.key === "Enter" && handlemessage();
            }}
          />
          <button id="btn_chat" onClick={handlemessage}>
            &#9658;
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
