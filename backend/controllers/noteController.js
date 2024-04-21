const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/notesModel");

const addNotes = asyncHandler(async (req, res) => {
  //get user from JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found!");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket Not Found!");
  }

  if (ticket.user.toString() !== req.user.id && !user.isAdmin) {
    res.status(401);
    throw new Error("You Are Unauthorized!");
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: req.body.isStaff,
    ticket: req.params.ticketId,
    user: req.user.id,
  });

  if (!note) {
    res.status(400);
    throw new Error("Note Not Created!");
  }

  res.status(201).json(note);
});

const getNotes = asyncHandler(async (req, res) => {
  //get user from JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found!");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket Not Found!");
  }
  if (ticket.user.toString() !== req.user.id && !user.isAdmin) {
    res.status(401);
    throw new Error("You Are Unauthorized!");
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  if (!notes) {
    res.status(404);
    throw new Error("Notes Not Found!!");
  }

  res.status(200).json(notes);
});

module.exports = { getNotes, addNotes };
