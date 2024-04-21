import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../features/notes/notesSlice";

function AddNotes({ handleNewNotes, newNotes, user }) {
  const dispatch = useDispatch();
  const { ticket } = useSelector((state) => state.ticket);
  const [formData, setformData] = useState("");

  const handleSubmit = () => {
    const data = {
      ticketId: ticket._id,
      userID: ticket.user,
      isStaff: user?.admin ? true : false,
      text: formData,
    };
    if (formData) {
      dispatch(createNote(data));
      handleNewNotes();
      setformData("");
    }
  };

  const cancleNote = () => {
    setformData("");
    handleNewNotes();
  };

  return (
    <div
      className={
        newNotes
          ? " w-50 h-50 p-4 d-flex flex-column align-items-start justify-content-center position-absolute top-50 start-50 translate-middle z-index-master  container bg-white bg-gradient shadow-lg rounded-3 "
          : "d-none"
      }
    >
      <textarea
        name="text"
        className="w-100 h-100 p-2 border border-1 rounded shadow-sm  "
        placeholder="Write Note for staff"
        value={formData}
        onChange={(e) => setformData(e.target.value)}
      ></textarea>

      <div className="w-100 mt-4 px-4 d-flex flex-row align-items-center justify-content-end">
        <button
          className="w-auto mx-4 px-auto py-2 btn btn-sm btn-outline-success "
          onClick={handleSubmit}
        >
          submit
        </button>
        <button
          className="w-auto px-auto py-2 btn btn-sm btn-outline-primary "
          onClick={cancleNote}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddNotes;
