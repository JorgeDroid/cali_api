import { connectPostgres } from "../src";
const roles = [{ name: "Admin" }, { name: "Client" }, { name: "Technician" }];

async function seedRoles() {
  const db = await connectPostgres();
  try {
    for (const role of roles) {
      await db.query("INSERT INTO roles (name) VALUES ($1) ", [role.name]);
    }
    console.log("Roles seeded successfully");
  } catch (error) {
    console.error("Error seeding roles:", error);
  } finally {
    await db.end();
  }
}

seedRoles();
