import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import { Tickets, deletedTicket } from "../features/tickets/ticketSlice";
import useAuth from "../hooks/useAuth";

function AllTickets() {
  // const [deleted, setDeleted] = useState(false);
  const dispatch = useDispatch();
  const { tickets, isLoading } = useSelector((state) => state.ticket) || [];
  const { user } = useSelector((state) => state.auth);
  useAuth(user);

  const newTickets = tickets?.filter((ticket) => ticket.status !== "closed");
  const closedTickets = tickets?.filter((ticket) => ticket.status == "closed");

  useEffect(() => {
    dispatch(Tickets());
  }, []);

  if (tickets.length == 0 && !isLoading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center m-5">
        <h1 className="text-secondary text-center">No Tickets Available</h1>
        <h6 className="text-body-tertiary text-center">Create Tickets First</h6>
        <BackButton location={"/"} />
      </div>
    );
  }

  return (
    <div className="Container-fluid p-5 ">
      <h1 className="text-secondary text-center">All Tickets</h1>
      <BackButton location={"/"} />
      {/* new and open tickets  */}
      <div className="card p-3 my-3">
        <h3 className="card-title p-2 text-dark opacity-75 text-center border-bottom">
          New And Open Tickets
        </h3>
        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center text-center">
            <h4>Loading...</h4>
          </div>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Product</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
                <th scope="col">Details</th>
                {!user?.admin && <th scope="col">Delete</th>}
              </tr>
            </thead>
            {tickets.length > 0 &&
              newTickets.map((ticket, index) => (
                <tbody key={index}>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{ticket?.product}</td>
                    <td>
                      <span
                        className={
                          ticket.status == "New"
                            ? "badge text-bg-success "
                            : ticket.status == "Open"
                            ? "badge text-bg-primary "
                            : "badge text-bg-danger "
                        }
                      >
                        {ticket?.status}
                      </span>
                    </td>
                    <td>
                      {tickets &&
                        ticket.createdAt
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("/")}
                    </td>
                    <td>
                      <Link
                        to={`/ticket/${ticket?._id}`}
                        className="btn btn-sm fw-medium text-white bg-secondary"
                      >
                        View
                      </Link>
                    </td>
                    {!user?.admin &&
                      (ticket?.status == "closed" ? (
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger mx-2"
                            onClick={() => {
                              const ticketId = ticket?._id;
                              dispatch(deletedTicket(ticketId));
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      ) : (
                        <td>--</td>
                      ))}
                  </tr>
                </tbody>
              ))}
          </table>
        )}
      </div>

      {/* closed tickets  */}
      <div className="card p-3 ">
        <h3 className="card-title p-2 text-dark opacity-75 text-center border-bottom">
          Closed Tickets
        </h3>
        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center text-center">
            <h4>Loading...</h4>
          </div>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Product</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
                <th scope="col">Details</th>
                {!user?.admin && <th scope="col">Delete</th>}
              </tr>
            </thead>
            {tickets.length > 0 &&
              closedTickets.map((ticket, index) => (
                <tbody key={index}>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{ticket?.product}</td>
                    <td>
                      <span
                        className={
                          ticket.status == "New"
                            ? "badge text-bg-success "
                            : ticket.status == "Open"
                            ? "badge text-bg-primary "
                            : "badge text-bg-danger "
                        }
                      >
                        {ticket?.status}
                      </span>
                    </td>
                    <td>
                      {tickets &&
                        ticket?.createdAt
                          ?.split("T")[0]
                          .split("-")
                          .reverse()
                          .join("/")}
                    </td>
                    <td>
                      <Link
                        to={`/ticket/${ticket?._id}`}
                        className="btn btn-sm fw-medium text-white bg-secondary"
                      >
                        View
                      </Link>
                    </td>
                    {!user?.admin &&
                      (ticket?.status == "closed" ? (
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger mx-2"
                            onClick={() => {
                              const ticketId = ticket?._id;
                              dispatch(deletedTicket(ticketId));
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      ) : (
                        <td>--</td>
                      ))}
                  </tr>
                </tbody>
              ))}
          </table>
        )}
      </div>
    </div>
  );
}

export default AllTickets;
