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
        Page not found
      </h1>
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
