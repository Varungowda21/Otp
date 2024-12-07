const mongoose = require("mongoose");
const configdb = async () => {
  try {
    const db = await mongoose.connect("mongodb://localhost:27017/otp");
    console.log("connect to db");
  } catch (err) {
    console.log(err);
  }
};

module.exports = configdb;
