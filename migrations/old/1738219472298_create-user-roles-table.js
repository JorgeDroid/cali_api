/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("user_roles", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    user_id: {
      type: "uuid",
      notNull: true,
      references: "users",
      onDelete: "CASCADE",
    },
    role_id: {
      type: "uuid",
      notNull: true,
      references: "roles",
      onDelete: "CASCADE",
    },
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
  pgm.dropTable("user_roles");
};
