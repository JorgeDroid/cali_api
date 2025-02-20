import fastify from "fastify";
import cors from "@fastify/cors";

import pg from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const { Pool } = pg;

export async function connectPostgres() {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    await pool.connect();
    console.log("Connected to PostgreSQL!");
    return pool;
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    throw error;
  }
}

async function bootstrap() {
  const app = fastify({
    logger: true,
  });

  app.register(cors, {
    origin: "*",
  });

  // Initialize database connection
  const pool = await connectPostgres();

  // Close database connection when the server is closed
  process.on("SIGTERM", () => {
    pool.end();
  });

  // Register routes
  app.register(require("./routes/clients"), { prefix: "api" });
  app.register(require("./routes/admins"), { prefix: "api" });
  app.register(require("./routes/technicians"), { prefix: "api" });
  app.register(require("./routes/brands"), { prefix: "api" });
  app.register(require("./routes/models"), { prefix: "api" });
  app.register(require("./routes/spares"), { prefix: "api" });
  // Start the server
  const port = parseInt(process.env.PORT ?? "", 10) || 3000;
  console.log("Starting server on port", port);
  await app.listen({ port, host: "0.0.0.0" }, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

bootstrap().catch((error) => {
  console.error("Error starting server:", error);
});
