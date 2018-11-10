const config = require("./api/config.auto.js");

module.exports = {
  client: "mysql",
  connection: config.database,
};
