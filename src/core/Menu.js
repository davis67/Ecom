import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#ff9900"
    };
  } else {
    return {
      color: "#ffff"
    };
  }
};
/**
 * we access history by using the props.
 * lets distructure props.history to {history}
 */
const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
          </Fragment>
        )}
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/signout")}
            to="/signout"
          >
            Sign out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
