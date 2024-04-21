const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database is Connected at ${conn.connection.host}`);
  } catch (error) {
    console.log(`Database Connection Failed : ${error.message}`);
  }
};

module.exports = connectDB;
