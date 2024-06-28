"use strict";

const mongoose = require("mongoose");
const environment = require("../../config/environment");

async function connectToDB() {
  try {
    let ab = await mongoose.connect(environment.database.url);

    console.log("Connected to MongoDB database!");
  } catch (error) {
    console.error("Connection error:", error);
    process.exit(1); // Optionally exit process in case of connection failure
  }
}

module.exports = { connectToDB };
