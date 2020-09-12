import React from 'react';
import {Route, Switch} from "react-router-dom";
import About from "./About";
import Home from "./Home";

function App() {
  return (

    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;
