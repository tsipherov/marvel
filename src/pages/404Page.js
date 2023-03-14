import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <h1>Page not found</h1>
      <Link to="/">Return to main page</Link>
    </>
  );
};

export default PageNotFound;
