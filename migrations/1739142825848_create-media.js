/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("media", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    url: {
      type: "varchar(255)", // Adjust length as needed
      notNull: true, // URL is usually required
      unique: true, // URLs should generally be unique
    },
    name: {
      type: "varchar(255)", // Adjust length as needed
    },
    created_at: {
      type: "timestamp with time zone",
      notNull: true,
      default: pgm.func("now()"),
    },
    updated_at: {
      type: "timestamp with time zone",
      notNull: true,
      default: pgm.func("now()"),
    },
  });

  // Optional: Index on name (if you frequently search/filter by name)
  pgm.createIndex("media", "name");
  pgm.createIndex("media", "url", { unique: true }); // Index and unique constraint combined
};

exports.down = (pgm) => {
  pgm.dropTable("media");
};
