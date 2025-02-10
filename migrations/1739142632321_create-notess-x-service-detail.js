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
  pgm.createTable("notes_x_service_detail", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    service_details_id: {
      type: "uuid",
      notNull: true, // Typically not null in join tables
      references: "service_details(id)",
    },
    service_notes_id: {
      type: "uuid",
      notNull: true, // Typically not null in join tables
      references: "service_notes(id)",
    },
  });

  // Optional: Individual indexes (can be useful)
  pgm.createIndex("notes_x_service_detail", "service_details_id");
  pgm.createIndex("notes_x_service_detail", "service_notes_id");
};

exports.down = (pgm) => {
  pgm.dropTable("notes_x_service_detail");
};
