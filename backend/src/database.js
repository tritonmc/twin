import knex from "knex";
import knexfile from "../knexfile.js";
import { logger } from "./logger.js";

const db = knex(knexfile);

export const getTokenUser = async (token) => {
  if (!token) throw new Error("No token provided");
  const result = await db("twin_tokens").select("spigot_username").where("token", token);

  if (result.length === 0) throw new Error("No permission");
  logger.debug({ result }, "Got user for given token");
  return result[0].spigot_username;
};

export default {
  getTokenUser,
};
