import config from "./config.js";

export default {
  client: "mysql",
  connection: config.database,
  migrations: {
    directory: "./migrations",
    loadExtensions: [".mjs"],
  },
};
