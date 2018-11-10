const knex = require("knex")(require("../../knexfile.js"));

module.exports.getTokenUser = (token) => {
  return new Promise((resolve, reject) => {
    if (!token) reject("No token provided");
    knex("twin_tokens")
      .select("spigot_username")
      .where("token", token)
      .then((result) => {
        if (result.length == 0) reject("No permission");
        else resolve(result[0].spigot_username);
      })
      .catch((err) => reject(err));
  });
};
