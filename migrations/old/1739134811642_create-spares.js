/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("spares", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    model_id: {
      type: "uuid",
      notNull: true,
      references: "models(id)", // Foreign key constraint
    },
    name: {
      type: "varchar(255)", // Adjust length as needed
      notNull: true, // Spares should have a name
    },
    sku: {
      type: "varchar(255)", // Adjust length as needed
      notNull: true, // Spares should have an SKU
    },
    code: {
      type: "varchar(255)", // Adjust length as needed
    },
    price: {
      type: "numeric", // Use numeric for prices (not number)
      notNull: true,
    },
  });

  // Optional: Indexes for faster lookups
  pgm.createIndex("spares", "model_id");
  pgm.createIndex("spares", "name");
  pgm.createIndex("spares", "sku"); // Index and unique constraint combined
  pgm.createIndex("spares", "code"); // Index and unique constraint combined
};

exports.down = (pgm) => {
  pgm.dropTable("spares");
};
