const cors = require("cors");
const express = require("express");
module.exports = function expressConfig(app) {
  app.use(cors);
  app.use(express.json());
};
