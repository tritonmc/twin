import config from "./config.js";

export default {
  client: "pg",
  connection: config.database,
  migrations: {
    directory: "./migrations",
    loadExtensions: [".mjs"],
  },
};
