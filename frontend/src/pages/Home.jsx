import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Home() {
  const { user } = useSelector((state) => state.auth);
  useAuth(user);
  return (
    <div className="container-fluid p-5">
      <h1 className="text-secondary text-center h1">Welcome {user?.name}</h1>
      <div className="card p-5 my-3 shadow">
        <h2 className="text-center fw-semibold my-3">
          {user?.admin ? "Want to start work?" : "How Can We Help You Today?"}
        </h2>
        {!user?.admin && (
          <Link to={"/ticket/new"} className="btn btn-primary fs-6 h1 p-2 my-2">
            Create New Ticket
          </Link>
        )}
        <Link
          to={"/ticket/all-tickets"}
          className="btn btn-primary text-md fs-6 h1 p-2 my-2"
        >
          View All Tickets
        </Link>
      </div>
    </div>
  );
}

export default Home;
