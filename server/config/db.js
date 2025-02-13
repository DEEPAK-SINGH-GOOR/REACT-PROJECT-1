const mongoose = require('mongoose');
require("dotenv").config();


const connectDb = async () => {
    try {
      await mongoose.connect(process.env.DB_URL);
      console.log("Connected to database");
    } catch (error) {
      console.error("Database connection failed:", error.message);
    }
  };
  
module.exports = connectDb