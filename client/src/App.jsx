import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  const setRoomFunc = (e) => {
    setRoom(e.target.value);
  };

  const joinRoomFunc = () => {
    if (room === "") {
      alert("Please join room first");
    }
    socket.emit("join_room", room);
  };
 
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data.message);
    });
  }, [socket]);

  const typeMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="App">
      <input placeholder="Input Room number" onChange={setRoomFunc} />
      <button onClick={joinRoomFunc}>Join Room</button>
      <input
        type="text"
        placeholder="Send message..."
        style={{ width: "300px", height: "30px", marginRight: "2rem" }}
        onChange={typeMessage}
      />
      <button onClick={sendMessage}>Send</button>
      <p>{receivedMessage}</p>
    </div>
  );
}

export default App;
