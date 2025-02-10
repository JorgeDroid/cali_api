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
  pgm.createTable("models", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    brand_id: {
      type: "uuid",
      notNull: true,
      references: "brands(id)", // Foreign key constraint
    },
    name: {
      type: "varchar(255)", // Adjust length as needed
      notNull: true, // Models likely need a name
    },
  });

  // Optional: Index on brand_id for faster lookups
  pgm.createIndex("models", "brand_id");

  // Optional: Index on name if you'll be frequently querying by model name
  pgm.createIndex("models", "name");

  // Optional: Unique constraint on brand_id and name combination (a brand can have multiple models, but a model name should be unique within a brand)
};

exports.down = (pgm) => {
  pgm.dropTable("models");
};
