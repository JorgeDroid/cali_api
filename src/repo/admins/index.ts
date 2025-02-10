import { connectPostgres } from "../..";
import { IClientCreationDto, IClientUpdateDto } from "../../schemas/Client";

export const Create = async (data: IClientCreationDto) => {
  const db = await connectPostgres();
  try {
    const user = await db.query(
      "INSERT INTO users (name, last_name, email, phone, password) VALUES ($1,$2, $3, $4, $5) RETURNING *",
      [data.name, data.last_name, data.email, data.phone, data.password]
    );
    const newClient = user.rows[0];
    const clientRole = await db.query("SELECT * FROM roles WHERE name = $1", [
      "Admin",
    ]);
    await db.query(
      "INSERT INTO user_roles (user_id, role_id) VALUES ($1,$2) RETURNING *",
      [newClient.id, clientRole.rows[0].id]
    );
    await db.query("INSERT INTO admins (user_id) VALUES ($1)", [newClient.id]);
    db.end();
    return newClient;
  } catch (e: any) {
    return e.message;
  }
};

export const GetAll = async () => {
  const db = await connectPostgres();
  try {
    const clients = await db.query(
      "SELECT name, last_name, email, phone, users.created_at, users.updated_at FROM users inner join admins on users.id = admins.user_id "
    );
    db.end();
    return clients.rows;
  } catch (e: any) {
    return e.message;
  }
};

export const GetByID = async (adminId: string) => {
  const db = await connectPostgres();
  try {
    const client = await db.query(
      "SELECT name, last_name, email, phone, users.created_at, users.updated_at FROM users inner join admins on users.id = admins.user_id WHERE users.id = $1",
      [adminId]
    );
    db.end();
    return client.rows[0];
  } catch (e: any) {
    return e.message;
  }
};

export const Update = async (adminId: string, data: IClientUpdateDto) => {
  const db = await connectPostgres();
  try {
    const oldAdminResult = await db.query("SELECT * FROM users WHERE id = $1", [
      adminId,
    ]);
    const oldAdmin = oldAdminResult.rows[0];

    if (!oldAdmin) {
      throw new Error("Admin not found");
    }
    if (!data.password) {
      data.password = oldAdmin.password;
    }
    if (!data.name) {
      data.name = oldAdmin.name;
    }
    if (!data.last_name) {
      data.last_name = oldAdmin.last_name;
    }
    if (!data.email) {
      data.email = oldAdmin.email;
    }
    if (!data.phone) {
      data.phone = oldAdmin.phone;
    }
    const client = await db.query(
      "UPDATE users SET name = $1, last_name = $2, email = $3, phone = $4, password = $5 WHERE id = $6 RETURNING *",
      [
        data.name,
        data.last_name,
        data.email,
        data.phone,
        data.password,
        adminId,
      ]
    );
    db.end();
    return client.rows[0];
  } catch (e: any) {
    return e.message;
  }
};

export const Delete = async (adminId: string) => {
  const db = await connectPostgres();
  try {
    await db.query("DELETE FROM users WHERE id = $1", [adminId]);
    await db.query("DELETE FROM user_roles WHERE user_id = $1", [adminId]);
    await db.query("DELETE FROM admins WHERE user_id = $1", [adminId]);
    db.end();
    return { message: "Admin deleted successfully" };
  } catch (e: any) {
    return e.message;
  }
};
