import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel information portal" />
        <title>Page not found</title>
      </Helmet>
      <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
        404 PAGE NOT FOUND
      </h1>
      <h3>404 PAGE NOT FOUND</h3>
      <Link
        style={{
          display: "block",
          textAlign: "center",
          fontWeight: "bold",
          color: "blue",
          fontSize: "20px",
          marginTop: "30px",
        }}
        to="/"
      >
        Return to main page
      </Link>
    </>
  );
};

export default PageNotFound;
