import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createCategory } from "./apiAdmin";
import { from } from "rxjs";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  /**
   * desctructure user and token from the localstorage
   */
  const { user, token } = isAuthenticated();
  const handleChange = e => {
    setError("");
    setName(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };
  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is created</h3>;
    }
  };
  const showError = () => {
    if (error) {
      return <h3 className="text-danger">{name} already exists</h3>;
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );
  const newCategoryForm = () => (
    <div>
      {showError()}

      {showSuccess()}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            autoFocus
            required
          />
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Add Category
        </button>
      </form>
      {goBack()}
    </div>
  );

  return (
    <Layout
      title="Add a new Category"
      description={`Hello, ${user.name}!, ready to add a new category`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">{newCategoryForm()}</div>
      </div>
    </Layout>
  );
};

export default AddCategory;
