import React, {useState} from "react";

function getCurrentTime() {
  return new Date().toLocaleTimeString();
}

function App() {
  const [time, setTime] = useState(getCurrentTime());

  function displayCurrentTime() {
    setTime(getCurrentTime());
  }

  //Display current time continously
  setInterval(displayCurrentTime, 1000);
  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={displayCurrentTime}>Get Time</button>
    </div>
  );
}

export default App;
