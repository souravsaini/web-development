import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  function onChangeHandler(event) {


    const changedField = event.target.name;
    const changedValue = event.target.value;
    console.log(changedField, changedValue);


    setContact(prevValue => {
        return {
          ...prevValue,
          [changedField]: changedValue



  /*     fName: changedValue,
          lName: prevValue.lName,
          email: prevValue.email
        };
      } else if (changedField === "lName") {
        return {
          fName: prevValue.fName,
          lName: changedValue,
          email: prevValue.email
        };
      } else if (changedField === "email") {
        return {
          fName: prevValue.fName,
          lName: prevValue.lName,
          email: changedValue */
      };
    });
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form>
        <input onChange={onChangeHandler} name="fName" placeholder="First Name" value={contact.fName} />
        <input onChange={onChangeHandler} name="lName" placeholder="Last Name" value={contact.lName} />
        <input onChange={onChangeHandler} name="email" placeholder="Email" value={contact.email} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
