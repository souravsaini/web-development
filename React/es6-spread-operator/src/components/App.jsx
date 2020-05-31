import React, {useState} from "react";

function App() {

  const todos = [];
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  function onChangeHandler(event) {
    const value = event.target.value;
    setInputText(value)
  }

  function onClickHandler(event) {
    setItems( (prevItems) => {
      return [...prevItems, inputText];
    });
    setInputText("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={onChangeHandler} type="text" name="todo" value={inputText}/>
        <button onClick={onClickHandler}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map( (item) => <li>{item}</li> )}

        </ul>
      </div>
    </div>
  );
}

export default App;
