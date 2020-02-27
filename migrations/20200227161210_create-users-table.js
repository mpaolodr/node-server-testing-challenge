exports.up = function(knex) {
  return knex.schema.createTable("users", col => {
    col.increments();

    col
      .text("name")
      .unique()
      .notNullable()
      .index();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
