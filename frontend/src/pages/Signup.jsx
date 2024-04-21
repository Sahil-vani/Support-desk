import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../features/auth/authSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      document.getElementById("checked").innerHTML = "";
      dispatch(signupUser(formData));
    } else {
      document.getElementById("checked").innerHTML = "Password Not Matched";
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="container-fluid p-5">
      <h1 className=" text-center text-secondary">Signup Here</h1>
      <div className="card p-3 my-3">
        <h6 id="checked" className=" text-center text-danger"></h6>
        <form className="my-1" onSubmit={handleSubmit} id="signup">
          <input
            type="text"
            className="form-control fw-medium my-3"
            placeholder="Enter Name"
            required
            autoComplete="given-name"
            value={name}
            onChange={handleChange}
            name="name"
          />

          <input
            type="email"
            className="form-control fw-medium my-3"
            placeholder="Enter Email"
            required
            autoComplete="email webauthn"
            value={email}
            onChange={handleChange}
            name="email"
          />

          <input
            type="password"
            className="form-control fw-medium my-3"
            placeholder="Enter Password"
            required
            autoComplete="new-password"
            value={password}
            onChange={handleChange}
            name="password"
          />
          <input
            type="password"
            className="form-control fw-medium my-3"
            placeholder="Confirm Password"
            required
            autoComplete="off"
            value={confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
          />
          <button className="btn btn-primary w-100" onClick={handleSubmit}>
            Signup
          </button>
        </form>
        <h6 className="text-center text-secondary">
          Already have an account? <Link to={"/login"}>Login</Link>
        </h6>
      </div>
    </div>
  );
}

export default Signup;
