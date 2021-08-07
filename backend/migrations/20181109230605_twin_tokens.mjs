export const up = (knex) => {
  return knex.schema.createTable("twin_tokens", (t) => {
    t.string("discord_id", 25).unique().nullable();
    t.string("spigot_username", 36).unique().notNullable();
    t.string("spigot_id", 100).unique().nullable();
    t.string("token", 48).unique().notNullable();
  });
};

export const down = (knex) => {
  return knex.schema.dropTableIfExists("twin_tokens");
};
