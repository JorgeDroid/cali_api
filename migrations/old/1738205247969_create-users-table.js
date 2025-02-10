/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    name: { type: "text", notNull: true },
    last_name: { type: "text", notNull: true },
    email: { type: "text", notNull: true, unique: true },
    phone: { type: "text", notNull: true },
    password: { type: "text", notNull: true },
    active: { type: "boolean", notNull: true, default: true },
    created_at: {
      type: "timestamp",
      notNull: false,
      default: pgm.func("NOW()"),
    },
    updated_at: {
      type: "timestamp",
      notNull: false,
      default: pgm.func("NOW()"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
