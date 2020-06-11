import React, { useState, useEffect } from "react";

import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

function Home() {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts()
    .then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setProducts(data)
      }
    })
  }

  useEffect( () => {
    loadAllProducts()
  }, [])

  return (
    <div>
      <Base title="Home Page" description="Welcome to XMan Shopping">
        <div className="row text-center">
          <h1 className="text-white"> All of Tshirts</h1>
          <div className="row">
            {products.map( (product, index) => {
              return (
                <div className="col-md-4 mb-4" key={index}>
                  <Card product={product}/>
                </div>
              )
            })}
          </div>
        </div>
      </Base>
    </div>
  )
}

export default Home;
