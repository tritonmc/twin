import knexfile from "../knexfile.js";
import knex from "knex";

const db = knex(knexfile);

export const getTokenUser = async (token) => {
  if (!token) throw new Error("No token provided");
  const result = await db("twin_tokens").select("spigot_username").where("token", token);

  if (result.length === 0) throw new Error("No permission");
  return result[0].spigot_username;
};

export default {
  getTokenUser,
};
