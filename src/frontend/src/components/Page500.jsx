import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function () {
  return (
    <div>
        <Helmet>
            <title>Internal Server Error</title>
        </Helmet>
      {/* <img src={PageNotFound}  /> */}
      <p style={{ textAlign: "center" }}>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
}
