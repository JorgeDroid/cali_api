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
  pgm.createTable("media_x_service_detail", {
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
    media_id: {
      type: "uuid",
      notNull: true, // Typically not null in join tables
      references: "media(id)",
    },
  });

  // Optional: Individual indexes (can be useful)
  pgm.createIndex("media_x_service_detail", "service_details_id");
  pgm.createIndex("media_x_service_detail", "media_id");
};

exports.down = (pgm) => {
  pgm.dropTable("media_x_service_detail");
};
