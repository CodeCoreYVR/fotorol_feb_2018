// Migration files are always created with a big number, a date-time
// smooshed together and a name that we provide. This big number
// is used determine the order which migrations should run.
// The smallest beging the first and the largest being the last.

// The exports.up method is used when migration is run.
exports.up = knex => {
  return knex.schema.createTable("posts", table => {
      table.increments("id");
      // Create a column that has unique rows, is auto-generated,
      // is auto-incremented and serves as primary key.
      table.string("username");
      // Creates a column of data-type "string" with name "username"
      table.text("description");
      // Creates a column of data-type "text" with name "description"
      table.string("pictureUrl");
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      // Creates a timestamp (holding the data & time) which
      // is set to a default of the current date at the time
      // the row is created.
    })
};

// The exports.down method is used when a migration is rolled
// back (reverted.) You should always a query that reverses
// the query in "up".
exports.down = knex => {
  return knex.schema.dropTable("posts");
};
