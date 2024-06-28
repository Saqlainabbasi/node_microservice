const environment = require("../config/environment");
const db = require("../orm/mongoose/mongoose");

module.exports = class Database {
  async init() {
    if (environment.database.dialect === "mongodb") {
      return await db.connectToDB();
    }
    if (environment.database.dialect === "mysql") {
      console.log("init mysql");
    }
  }
};
