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
  pgm.createTable("vehicles", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    client_id: {
      type: "uuid",
      notNull: true,
      references: "clients(id)", // Foreign key constraint
    },
    model_id: {
      type: "uuid",
      notNull: true,
      references: "models(id)", // Foreign key constraint
    },
    year: {
      type: "varchar(4)", // Year should be 4 digits
      notNull: true,
    },
    vin: {
      type: "varchar(255)", // Adjust length as needed for license plates
      notNull: true, // Plates are usually required
      unique: true, // License plates should be unique
    },
    plate: {
      type: "varchar(255)", // Adjust length as needed for license plates
      notNull: true, // Plates are usually required
      unique: true, // License plates should be unique
    },
    color: {
      type: "varchar(255)", // Adjust length as needed
    },
    name: {
      // A custom name for the vehicle (e.g., "My Car")
      type: "varchar(255)", // Adjust length as needed
    },
  });

  // Optional: Indexes for faster lookups
  pgm.createIndex("vehicles", "client_id");
  pgm.createIndex("vehicles", "model_id");
  pgm.createIndex("vehicles", "plate", { unique: true }); // Index and unique constraint combined
  pgm.createIndex("vehicles", "year"); // Index on year is often useful
};

exports.down = (pgm) => {
  pgm.dropTable("vehicles");
};
