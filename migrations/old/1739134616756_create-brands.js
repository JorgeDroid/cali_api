/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("brands", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    name: {
      type: "varchar(255)", // Choose an appropriate length
      notNull: true, // Brands likely need a name
      unique: true, // Brand names should probably be unique
    },
  });

  // Optional: Index on name for faster lookups
};

exports.down = (pgm) => {
  pgm.dropTable("brands");
};
