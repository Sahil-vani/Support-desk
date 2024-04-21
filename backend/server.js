const express = require("express");
const connectDB = require("./config/db_config");
const { errorHandler } = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();

// DB Connection
connectDB();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    msg: "Welcome to support desk v.1",
  });
});

// user routes
app.use("/api/user", require("./routes/userRegister"));

// ticket routes
app.use("/api/ticket", require("./routes/ticketRoutes"));

// ticket routes
app.use("/api/notes", require("./routes/noteRoutes"));

//error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening at port : ${PORT}`);
});
