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
  pgm.createTable("clients", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"), // Recommended for UUID PKs
    },
    user_id: {
      type: "uuid",
      notNull: true, //  Consider if user_id should always be present
      references: "users(id)", // Creates the foreign key constraint
    },
    created_at: {
      type: "timestamp with time zone", // Use timestamptz for time zone info
      notNull: true,
      default: pgm.func("now()"),
    },
    updated_at: {
      type: "timestamp with time zone", // Use timestamptz
      notNull: true,
      default: pgm.func("now()"),
    },
  });
  pgm.createIndex("clients", "user_id");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("clients");
};
