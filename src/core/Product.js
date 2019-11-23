import React, { Fragment, useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";
import moment from "moment";
const Product = props => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        listRelated(data._id).then(prod => {
          if (prod.error) {
            setError(prod.error);
          } else {
            setRelatedProduct(prod);
          }
        });
      }
    });
  };
  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">IN STOCK</span>
    ) : (
      <span className="badge badge-danger badge-pill">OUT OF STOCK</span>
    );
  };
  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);
  return (
    <Layout
      title={product.name}
      description={
        product && product.description && product.description.substring(0, 99)
      }
      className="container-fluid"
    >
      {product && product.description && (
        <Fragment>
          <div className="row">
            <Card product={product} showViewProductButton={false} />
            <div className="cardcol-7" style={{ border: "none" }}>
              <div className="card-body">
                <p className="lead mt-2">{product.description}</p>
                <p className="black-9">${product.price}</p>
                <p className="black-8">
                  Category: {product.category && product.category.name}
                </p>
                <p className="black-8">
                  Added on {moment(product.createdAt).fromNow()}
                </p>
                {showStock(product.quantity)}
              </div>
            </div>
          </div>
          <h4>Related Products</h4>
          <div className="row">
            {relatedProduct.map((p, i) => (
              <Card key={i} product={p} />
            ))}
          </div>
        </Fragment>
      )}
    </Layout>
  );
};

export default Product;
