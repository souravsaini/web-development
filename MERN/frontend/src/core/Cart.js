import React, { useState, useEffect } from "react";

import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import Payment from "./Payment";
import { loadCart } from "./helper/cartHelper";

function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect( () => {
    setProducts(loadCart())
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2> Section to Load Products</h2>
          {products.map ((product, index) => {
            return (
              <Card
                key={index}
                product={product}
                removeFromCart={true}
                addtoCart={false}
                setReload={setReload}
                reload={reload}
              />
            )
          })}
      </div>
    )
  }

  const loadCheckout = () => {
    return (
      <div>
        <h2> Section for Checkout</h2>
      </div>
    )
  }


  return (
    <div>
      <Base title="Cart Page" description="Ready to Checkout">
        <div className="row text-center">
          <div className="col-md-6">
            {products.length > 0 ? loadAllProducts(products) : <h3>No Products in Cart</h3>}
          </div>
          <div className="col-md-6">
            <Payment product={products} setReload={setReload} />
          </div>
        </div>
      </Base>
    </div>
  )
}

export default Cart;
