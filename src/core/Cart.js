import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import Card from "./Card";
import { getCart } from "./cartHelper";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);
  const showItems = items => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <hr /> <Link to="shop"> Continue shopping</Link>
    </h2>
  );
  return (
    <Layout
      title="Shopping Cart"
      description="Manage Cart items.Add or remove items in the cart"
      className="container-flud"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2>Your cart summary</h2>

          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
