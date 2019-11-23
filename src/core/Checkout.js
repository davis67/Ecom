import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getBraintreeClientToken } from "./apiCore";
import DropIn from "braintree-web-drop-in-react";
import { processPayment } from "./apiCore";
const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: ""
  });
  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken
            }}
            onInstance={instance => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success">
            Checkout
          </button>
        </div>
      ) : null}
    </div>
  );
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  const getToken = (Id, userToken) => {
    // console.log(Id);
    // console.log(userToken);
    getBraintreeClientToken(Id, userToken).then(data => {
      if (data.error) {
        setData({
          ...data,
          error: data.error
        });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };
  const showSuccess = success => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Thanks! Your payment was successfull!
    </div>
  );
  useEffect(() => {
    getToken(userId, token);
  }, []);
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showError = error => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const buy = () => {
    //send the nonce to your server
    //nonce =data.instance.requestPaymentMethod()

    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then(data => {
        console.log(data);
        nonce = data.nonce;

        // console.log("send nonce and process", nonce, getTotal(products));

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products)
        };

        processPayment(userId, token, paymentData)
          .then(response => {
            setData({ ...data, success: response.success });
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        console.log("dropin error", error);
        setData({ ...data, error: error.message });
      });
  };
  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>
        {showError(data.error)}
        {showSuccess(data.success)}
        {showDropIn()}
      </div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Sign in to Checkout</button>
      </Link>
    );
  };
  return (
    <div>
      <h2> Total: $ {getTotal()} </h2> {showCheckout()}
    </div>
  );
};

export default Checkout;
