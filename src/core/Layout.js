import React from "react";
const Layout = ({ title = "Title", description = "description", children }) => (
  <div>
    <div className="jumbotron">
      <h2>{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className="container col-md-8 offset-md-2">{children}</div>
  </div>
);
export default Layout;
