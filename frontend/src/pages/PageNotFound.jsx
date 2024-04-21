import React from "react";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

function PageNotFound() {
  const { user } = useSelector((state) => state.auth);
  useAuth(user);
  return (
    <div className="container-fluid p-5">
      <BackButton location={"/"} />
      <h1 className="text-danger text-center h1">404 Page NOt Found</h1>
    </div>
  );
}

export default PageNotFound;
