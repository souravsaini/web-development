import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";

import "../styles.css";

const divStyle = {
  color: "#FFF"
}

const Base = (props) => {
  return (
    <div>
        <Menu />
        <Header title={props.title} description={props.description} />
        <div style={divStyle} className={props.className}> {props.children} </div>  {/*Composition*/}
        <Footer />
    </div>
  )
}

export default Base;
