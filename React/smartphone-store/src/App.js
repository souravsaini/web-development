import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart/Cart";
import Details from "./components/Details";
import Default from "./components/Default";
import Modal from "./components/Modal";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={ProductList} />
        <Route path="/details" exact component={Details} />
        <Route path="/cart" exact component={Cart} />
        <Route component={Default} />
      </Switch>
      <Modal />
    </>
  );
}

export default App;
