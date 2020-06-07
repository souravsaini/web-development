import React from "react";

const Header = (props) => {
  return (
  <div className="container-fluid">
    <div className="jumbotron bg-dark text-white text-center">
      <h2 className="display-4"> {props.title} </h2>
      <p className="lead"> {props.description} </p>
    </div>
  </div>
  )
}

export default Header;
