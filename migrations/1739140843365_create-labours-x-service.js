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
  pgm.createTable("labours_x_service", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    service_id: {
      type: "uuid",
      notNull: true, // Typically not null in join tables
      references: "services(id)",
    },
    labour_id: {
      type: "uuid",
      notNull: true, // Typically not null in join tables
      references: "labours(id)",
    },
  });

  // CRUCIAL: Composite unique index to prevent duplicate associations

  // Optional: Individual indexes (can be useful)
  pgm.createIndex("labours_x_service", "service_id");
  pgm.createIndex("labours_x_service", "labour_id");
};

exports.down = (pgm) => {
  pgm.dropTable("labours_x_service");
};
