const MongoUserRepo = require("../api/repo/mongo/UserRepo");
const environment = require("./environment");

function BuildRepo() {
  let repo = {};
  if (environment.database.dialect == "mongoDB") {
    repo.userRepository = new MongoUserRepo();
  }
  if (environment.database.dialect == "mysql") {
    // repo.userRepository = new UserRepo()
  }
  return repo;
}
module.exports = { BuildRepo };
