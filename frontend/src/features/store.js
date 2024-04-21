import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import ticketReducer from "./tickets/ticketSlice";
import noteReducer from "./notes/notesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketReducer,
    notes: noteReducer,
  },
});

export default store;
