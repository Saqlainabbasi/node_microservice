const dotenv = require("dotenv");

dotenv.config();
module.exports = (() => {
  //database env values
  console.log("environment.js");
  const environment = {
    database: {
      dialect: process.env.DATABASE_DIALECT,
      url: process.env.DATABASE_URI || "",
    },
    server: {
      port: process.env.SERVER_PORT || 3000,
    },
    amqp: {
      url: process.env.RABBIT_AMQP_URI || "",
    },
  };
  return environment;
})();
