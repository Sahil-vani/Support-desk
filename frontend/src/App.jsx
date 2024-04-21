import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import NewTicket from "./pages/NewTicket";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllTickets from "./pages/AllTickets";
import SingleTicket from "./pages/SingleTicket";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/ticket/new" element={<NewTicket />} />
        <Route path="/ticket/all-tickets" element={<AllTickets />} />
        <Route path="/ticket/:ticketId" element={<SingleTicket />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
