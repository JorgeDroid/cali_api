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
  pgm.sql(`
    CREATE TYPE service_status AS ENUM (
      'created',
      'waiting_approval',
      'approved',
      'in_progress',
      'completed'
    );
  `);

  // 2. Create the services table
  pgm.createTable("services", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    vehicle_id: {
      type: "uuid",
      notNull: true,
      references: "vehicles(id)", // Foreign key constraint
    },
    technician_id: {
      type: "uuid",
      references: "technicians(id)", // Foreign key constraint (can be nullable)
    },
    status: {
      type: "service_status",
      notNull: true,
      default: "created", // Set a default value
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
};

exports.down = (pgm) => {
  pgm.dropTable("services");
  pgm.sql("DROP TYPE service_status;"); // Drop the enum type
};
