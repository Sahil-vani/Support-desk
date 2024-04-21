import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <nav className="navbar bg-body-tertiary shadow-lg  ">
      <div className="container-fluid ">
        <Link to={"/"}>
          <span className="navbar-brand mx-3 h1">Support Desk</span>
        </Link>

        <span>
          {/* {!user && (
            <>
              <Link to={"/signup"} className="btn btn-sm btn-primary mx-2">
                SignUp
              </Link>
              <Link to={"/login"} className="btn btn-sm btn-primary mx-2">
                SignIn
              </Link>
            </>
          )} */}
          {user && (
            <button
              className="btn btn-sm btn-outline-danger mx-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
