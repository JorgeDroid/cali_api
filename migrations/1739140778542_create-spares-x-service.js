/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("spares_x_service", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    service_id: {
      type: "uuid",
      notNull: true, // Often, these association tables require both IDs
      references: "services(id)",
    },
    spare_id: {
      type: "uuid",
      notNull: true, // Often, these association tables require both IDs
      references: "spares(id)",
    },
  });

  // Optional: Individual indexes (can be useful depending on your queries)
  pgm.createIndex("spares_x_service", "service_id");
  pgm.createIndex("spares_x_service", "spare_id");
};

exports.down = (pgm) => {
  pgm.dropTable("spares_x_service");
};
