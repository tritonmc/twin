exports.up = function(knex, Promise) {
  return knex.schema.createTable("twin_tokens", (t) => {
    t.string("discord_id", 25)
      .unique()
      .nullable();
    t.string("spigot_username", 36)
      .unique()
      .notNullable();
    t.string("token", 48)
      .unique()
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("twin_tokens");
};
