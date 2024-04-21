const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please Fill All Detials!");
  }

  // get users id from jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found!");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "New",
  });
  res.send(ticket);
});

const getTickets = asyncHandler(async (req, res) => {
  // get users id from jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found!");
  }

  let tickets;
  if (user.isAdmin) {
    tickets = await Ticket.find();
  } else {
    tickets = await Ticket.find({ user: req.user.id });
  }

  if (!tickets) {
    res.status(404);
    throw new Error("Tickets Not Found");
  }

  res.status(200).json(tickets);
});

const singleTicket = asyncHandler(async (req, res) => {
  // get users id from jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found!");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket Not Found!");
  }

  res.status(200).json(ticket);
});

const deleteTicket = asyncHandler(async (req, res) => {
  // get users id from jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found!");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket Not Found!");
  }

  if (ticket.user.toString() !== req.user.id && !user.isAdmin) {
    res.status(401);
    throw new Error("You Are Not Authorized!");
  }
  await Ticket.findByIdAndDelete(req.params.id);
  let tickets;
  if (user.isAdmin) {
    tickets = await Ticket.find();
  } else {
    tickets = await Ticket.find({ user: req.user.id });
  }
  res.status(200);
  res.json({
    success: true,
    message: "Ticket Deleted!",
    tickets,
  });
});

const updateTicket = asyncHandler(async (req, res) => {
  // get users id from jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found!");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket Not Found!");
  }

  if (ticket.user.toString() !== req.user.id && !user.isAdmin) {
    res.status(401);
    throw new Error("You Are Not Authorized!");
  }
  const updated = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updated) {
    res.status(401);
    throw new Error("Ticket not Updated Yet");
  }
  res.status(200);
  res.json(updated);
  // console.log(updated);
});

// const allTickets = asyncHandler(async(req,res)=>{

// })

module.exports = {
  createTicket,
  getTickets,
  singleTicket,
  deleteTicket,
  updateTicket,
};
