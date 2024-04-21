import React from "react";
import { Link } from "react-router-dom";

function BackButton({ location }) {
  return (
    <Link to={location} className="my-3 btn btn-primary">
      ⬅️ Back
    </Link>
  );
}

export default BackButton;
