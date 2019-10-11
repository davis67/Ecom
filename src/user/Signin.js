import React, { useState } from "react";
import Layout from "../core/Layout";
import { Redirect } from "react-router-dom";
import { signin, isAuthenticated } from "../auth/index";
import { authenticate } from "../auth/index";
// import { API } from "../config";

const Signin = () => {
  const [values, setValues] = useState({
    email: "info@agabadavis.com",
    password: "agaba123",
    error: "",
    loading: false,
    redirectToReferrer: false
  });
  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    signin({
      email,
      password
    }).then(data => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          success: false
        });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };

  const signInForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted"> Email </label>
        <input
          type="email"
          onChange={handleChange("email")}
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted"> Password </label>
        <input
          type="password"
          onChange={handleChange("password")}
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{
        display: error ? "" : "none"
      }}
    >
      {error}
    </div>
  );
  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  return (
    <Layout
      title="Sign in Page"
      description="Sign in to Node React E-commerce app"
      className="container col-md-8 offset-md-2"
    >
      {redirectUser()} {showLoading()} {showError()}
      {signInForm()} {/* {JSON.stringify(values)} */}
    </Layout>
  );
};
export default Signin;
