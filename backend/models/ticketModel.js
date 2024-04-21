const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: String,
      required: [true, "Please Select Product!"],
      enum: ["iPhone", "iPad", "AppleWatch", "iMac", "Macbook", "iPod"],
    },
    description: {
      type: String,
      required: [true, "Please Add Description!"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Open", "Closed", "New"],
      default: "New",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
