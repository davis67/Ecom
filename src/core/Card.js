import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem, updateItem, removeItem } from "./cartHelper";
// import Layout from "../core/Layout";
// import { isAuthenticated } from "../auth";
// import { createProduct, getCategories } from "./apiAdmin";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-sm btn-outline-primary mt-2 mr-2 mb-2">
            View Product
          </button>
        </Link>
      )
    );
  };
  const handleChange = productId => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value);

    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };
  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };
  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-sm btn-outline-warning mt-2 mb-2"
        >
          Add to card
        </button>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => removeItem(product._id)}
          className="btn btn-sm btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };
  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header"> {product.name} </div>
        <div className="card-body">
          <ShowImage item={product} url="product" />
          <p> {product.description.substring(0, 100)} </p>
          <p> $ {product.price} </p>
          {showViewButton(showViewProductButton)}
          {showRemoveButton(showRemoveProductButton)}
          {showAddToCart(showAddToCartButton)}
          {showCartUpdateOptions(cartUpdate)}
        </div>
      </div>
    </div>
  );
};

export default Card;
