import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: ""
  });
  /**
   * desctructure user and token from the localstorage
   */
  const { user, token } = isAuthenticated();
  /**
   * destructure values in the state
   */
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    formData,
    createdProduct,
    redirectToProfile
  } = values;

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createProduct: data.name
        });
      }
    });
  };

  const goBack = () => (
    <div className="mt-5 mb-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );
  /**
   * initialize all the categories fetched and set the form data
   */
  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createProduct}`} is created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );
  useEffect(() => {
    init();
  }, []);
  const newProductForm = () => (
    <div>
      <form className="mb-3" onSubmit={handleSubmit}>
        <h4>Post Photo</h4>
        <div className="form-group">
          <input
            type="file"
            className="form-control"
            name="photo"
            accept="image/*"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Description</label>
          <input
            onChange={handleChange("description")}
            type="text"
            className="form-control"
            value={description}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Price</label>
          <input
            onChange={handleChange("price")}
            type="text"
            className="form-control"
            value={price}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Category</label>
          <select onChange={handleChange("category")} className="form-control">
            <option value>Please select..</option>
            {categories &&
              categories.map((c, i) => <option value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="text-muted">Quantity</label>
          <input
            onChange={handleChange("quantity")}
            type="text"
            className="form-control"
            value={quantity}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Shipping</label>
          <select onChange={handleChange("shipping")} className="form-control">
            <option>Please select...</option>
            <option value="1">YES</option>
            <option value="0">NO</option>
          </select>
        </div>
        <button type="submit" className="btn btn-sm btn-outline-primary">
          Add Product
        </button>
      </form>
      {goBack()}
    </div>
  );

  return (
    <Layout
      title="Add a new Product"
      description={`Hello, ${user.name}!, ready to add a new Product`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newProductForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
