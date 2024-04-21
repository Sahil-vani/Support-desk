import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { createTicket } from "../features/tickets/ticketSlice";
import useAuth from "../hooks/useAuth";

function NewTicket() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { ticket } = useSelector((state) => state.ticket);

  useAuth(user);

  const [formData, setFormData] = useState({
    email: user ? user.email : "",
    product: "iPhone",
    description: "",
  });
  const { product, description } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createTicket(formData));

    if (product && description && ticket) {
      navigate(`/ticket/all-tickets`);
    }
  };

  return (
    <div className="container-fluid p-5 ">
      <h1 className="text-center text-secondary h1">Create New Ticket</h1>
      <BackButton location={"/"} />
      <div className="card p-3">
        <h3 id="details" className="text-center text-body-tertiary fw-semibold">
          Please Fill All Details
        </h3>
        <form className="my-2" onSubmit={handleSubmit}>
          <input
            type="text "
            className="form-control fw-medium my-3"
            value={user == null ? "" : user.name}
            name="name"
            disabled
            autoComplete="off"
          />
          <input
            type="email"
            className="form-control fw-medium my-3"
            value={user == null ? "" : user.email}
            name="email"
            disabled
            autoComplete="off"
          />
          <select
            className="form-select my-3"
            name="product"
            value={product}
            onChange={handleChange}
            required
            autoComplete="off"
          >
            <option value="iPhone">iPhone</option>
            <option value="iPod">iPod</option>
            <option value="iPad">iPad</option>
            <option value="iMac">iMac</option>
            <option value="AppleWatch">AppleWatch</option>
            <option value="Macbook">Macbook</option>
          </select>
          <textarea
            cols="20"
            rows="7"
            className="form-control my-3"
            placeholder="Please Describe Your Issue"
            name="description"
            value={description}
            onChange={handleChange}
            required
            autoComplete="off"
          ></textarea>
          <button className="btn btn-primary text-white w-100">
            Raise Ticket
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewTicket;
