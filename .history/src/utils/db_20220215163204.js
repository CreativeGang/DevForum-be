const mongoose = require("mongoose");
// const config = require("config");

// //get value from config/default.js
// const db = config.get("mongoURI");

//todo => process.env.CONNECT_URL = mongodb:'//
const dbUrl = process.env.CONNECT_STRING;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      // useCreateIndex: true
    });
    console.log("mongoDB connected");
  } catch (err) {
    console.err(err.message);
    //exit process with failure
    process.exit(1);
  }
};
module.exports = connectDB;
