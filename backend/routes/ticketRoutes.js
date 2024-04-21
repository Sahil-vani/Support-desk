const express = require("express");
const {
  createTicket,
  getTickets,
  singleTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getTickets).post(protect, createTicket);
router
  .route("/:id")
  .get(protect, singleTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

//  Re Routing Towards /api/tickets/:ticketId/note
router.use("/:ticketId/note", require("./noteRoutes"));

module.exports = router;
