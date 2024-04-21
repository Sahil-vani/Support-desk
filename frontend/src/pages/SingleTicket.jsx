import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import AddNotes from "../components/AddNotes";
import { editedTicket, requiredTicket } from "../features/tickets/ticketSlice";
import { getNote } from "../features/notes/notesSlice";
import useAuth from "../hooks/useAuth";

function SingleTicket() {
  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { ticket, isSuccess } = useSelector((state) => state.ticket) || [];
  const { notes, isLoading } = useSelector((state) => state.notes) || [];

  useAuth(user);

  const [ticketClosed, setticketClosed] = useState(false);
  const [newNotes, setNewNotes] = useState(false);

  const handleNewNotes = () => {
    setNewNotes(!newNotes);
  };

  const handleCloseTicket = () => {
    const updatedTicket = {
      ...ticket,
      status: "closed",
    };

    dispatch(editedTicket(updatedTicket));
    setticketClosed(true);
  };

  const handleStatus = () => {
    const updatedTicket = {
      ...ticket,
      status: "Open",
    };
    dispatch(editedTicket(updatedTicket));
  };

  useEffect(() => {
    dispatch(requiredTicket(ticketId));
    dispatch(getNote(ticketId));
  }, []);

  if (user?.admin && ticket._id && ticket.status == "New") {
    setTimeout(handleStatus, 500);
  }

  // if (!isSuccess) {
  //   return (
  //     <div className="w-100 h-auto p-2 d-flex align-items-center justify-content-center text-center">
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }

  return (
    <div className=" container-fluid p-5 ">
      <h1 className="text-center text-secondary">Your Ticket</h1>
      {/* back button  */}
      <BackButton location={"/ticket/all-tickets"} />
      {/* details  */}

      <div className="card p-3 my-3">
        <h3 className="card-title">Product: {ticket?.product}</h3>
        {user?.admin && (
          <h5 className=" text-secondary">user Id : {ticket?.user}</h5>
        )}
        <h5 className=" text-secondary">Ticket Id : {ticket?._id}</h5>
        <h6 className=" text-secondary">
          Date:{" "}
          {ticket?.createdAt?.split("T")[0].split("-").reverse().join("/")}
        </h6>
        <h5 className=" text-secondary">
          Status :
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
        </h5>
        <h5 className="border-top pt-2">Description: {ticket?.description}</h5>
      </div>

      {/*  Add Notes  */}
      {!(ticket.status == "closed") && (
        <button className="btn btn-dark" onClick={handleNewNotes}>
          Add Note +
        </button>
      )}
      <div className="p-3 my-3 border-2 border rounded">
        <h3>Notes:</h3>
        {isLoading ? (
          <div className="w-100 h-auto p-2 d-flex align-items-center justify-content-center text-center">
            <h1>Loading...</h1>
          </div>
        ) : !notes.length == 0 ? (
          <ul className="my-3 border-top list-group">
            {notes.map((note, index) =>
              note.isStaff ? (
                <li
                  className="list-group-item  h-auto my-2 bg-secondary bg-opacity-50 d-flex flex-column align-items-start justify-content-center"
                  key={index}
                >
                  <p className=" fs-6 text-success "> staff</p>
                  <h6 className=" ">{note.text}</h6>
                  <p className=" text-secondary">{note.createdAt}</p>
                </li>
              ) : (
                <li
                  className="h-auto my-2 list-group-item d-flex flex-column align-items-end justify-content-center"
                  key={index}
                >
                  <p className=" text-primary fs-6 "> {user.name}</p>
                  <h6>{note.text}</h6>
                  <p className="text-secondary ">{note.createdAt}</p>
                </li>
              )
            )}
          </ul>
        ) : (
          <div className="w-100 h-auto p-2 d-flex align-items-center justify-content-center text-center">
            <h1>No Notes Available</h1>
          </div>
        )}
      </div>
      {ticket.status !== "closed" && (
        <button className="btn btn-danger w-100" onClick={handleCloseTicket}>
          Close Ticket
        </button>
      )}
      <AddNotes
        handleNewNotes={handleNewNotes}
        newNotes={newNotes}
        user={user}
      />
    </div>
  );
}

export default SingleTicket;
