const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  await mongoose.connect(process.env.DB_URL);
};

// Call the function to connect to the database


  module.exports = connectDB;
