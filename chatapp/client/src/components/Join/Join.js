import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const handleNameChange = event => {
    setName(event.target.value);
    console.log(name);
  }

  const handleRoomChange = event => {
    setRoom(event.target.value);
    console.log(room);
  }

  const handleClick = event => {
    return !name || !room ? event.preventDefault() : null;
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">join</h1>
        <div><input type="text" placeholder="name" className="joinInput"
          onChange={handleNameChange} /> </div>
        <div><input type="text" placeholder="room" className="joinInput mt-20"
          onChange={handleRoomChange} /> </div>
        <Link onClick={handleClick} to={`/chat?name=${name}&room=${room}`}>
          <button className="button mt-20" type="submit">sign in </button>
        </Link>
      </div>
    </div>
  )
}

export default Join;
