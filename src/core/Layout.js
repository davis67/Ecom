import React from "react";
import "../style.css";
const Layout = ({
  className = "",
  title = "Title",
  description = "description",
  children
}) => (
  <div>
    <div className="jumbotron">
      <h2> {title} </h2> <p className="lead"> {description} </p>
    </div>
    <div className={className}> {children} </div>
  </div>
);
export default Layout;
