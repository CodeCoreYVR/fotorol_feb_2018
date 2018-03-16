// Update with your config settings.

module.exports = {
  development: {
    client: "pg", // This property tells knex type of db we're using
    connection: {
      database: "fotorol_dev"
      // This property specifies the name of our db
    },
    migrations: {
      tableName: "knex_migrations",
      // This property names the table that will hold our
      // migration information
      directory: "./db/migrations"
      // This property specifies which directory will hold our
      // migration files
    }
  },
};
