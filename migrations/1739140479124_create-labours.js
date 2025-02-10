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
  pgm.createTable("labours", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    technician_id: {
      type: "uuid",
      references: "technicians(id)", // Foreign key constraint (nullable)
    },
    price: {
      type: "numeric", // Use numeric for prices
      notNull: true,
    },
    description: {
      type: "varchar(255)", // Adjust length as needed
    },
  });

  // Optional: Indexes
  pgm.createIndex("labours", "technician_id"); // Index even if nullable
  pgm.createIndex("labours", "price"); // Index on price can be useful
};

exports.down = (pgm) => {
  pgm.dropTable("labours");
};
