import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { getToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const Payment = ({products, setReload = f => f, reload = undefined}) => {

  const [info, setInfo]  = useState({
    loading: false,
    success: false,
    clientToken: null,
    instance: {},
    error: ""
  })

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getAToken = (userId, token) => {
    getToken(userId, token)
    .then(info => {
      console.log(info)
      if(info.error) {
        setInfo({...info, error: info.error})
      } else {
        const clientToken = info.clientToken;
        setInfo({clientToken})
      }
    })
  }

  const showDropIn = () => {
    return (
      <div>
        {info.clientToken != null && products.length > 0 ? (
          <div>
            <DropIn
              options={{authorization: info.clientToken}}
              onInstance={instance => {info.instance = instance}}
            />
            <button className="btn btn-success btn-block" onClick={onPurchase}> Buy </button>
          </div>
        ) : (<h3> Please Login or add something to cart </h3>)}
      </div>
    )
  }

  useEffect( () => {
    getAToken(userId, token)
  }, [])

  const onPurchase = () => {
    setInfo({loading: true})
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then(data => {
        nonce = data.nonce
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount()
        };
        processPayment(userId, token, paymentData)
        .then(res => {
          setInfo({...info, success: res.success, loading: false})
          const orderData = {
            products: products,
            transaction_id: res.transaction.id,
            amount: res.transaction.amount
          }
          createOrder(userId, token, orderData);
          cartEmpty( () => {

          })
          setReload(!reload);
        })
        .catch(err => {
          setInfo({loading: false, success: false })
        })
      })
  }

  const getAmount = () => {
    let amount = 0;
    products.map(product => {
      amount += product.price
    });
    return amount;
  }

  return (
    <div>
      <h3> Test Braintree </h3>
      {showDropIn()}
    </div>
  )
}

export default Payment;
