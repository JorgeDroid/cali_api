/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("admins", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    user_id: {
      type: "uuid",
      notNull: true, // Consider if user_id should always be present
      references: "users(id)",
    },
  });

  // Optional: Add an index for user_id for faster lookups
  pgm.createIndex("admins", "user_id");
};

exports.down = (pgm) => {
  pgm.dropTable("admins");
};
