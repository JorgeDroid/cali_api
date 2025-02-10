import { connectPostgres } from "../..";
import { IClientCreationDto, IClientUpdateDto } from "../../schemas/Client";

export const Create = async (data: IClientCreationDto) => {
  const db = await connectPostgres();
  try {
    const user = await db.query(
      "INSERT INTO users (name, last_name, email, phone, password) VALUES ($1,$2, $3, $4, $5) RETURNING *",
      [data.name, data.last_name, data.email, data.phone, data.password]
    );
    const newTechnician = user.rows[0];
    const technicianRole = await db.query(
      "SELECT * FROM roles WHERE name = $1",
      ["Technician"]
    );
    await db.query(
      "INSERT INTO user_roles (user_id, role_id) VALUES ($1,$2) RETURNING *",
      [newTechnician.id, technicianRole.rows[0].id]
    );
    await db.query("INSERT INTO technicians (user_id) VALUES ($1)", [
      newTechnician.id,
    ]);
    db.end();
    return newTechnician;
  } catch (e: any) {
    return e.message;
  }
};

export const GetAll = async () => {
  const db = await connectPostgres();
  try {
    const technicians = await db.query(
      "SELECT name, last_name, email, phone, users.created_at, users.updated_at FROM users inner join technicians on users.id = technicians.user_id "
    );
    db.end();
    return technicians.rows;
  } catch (e: any) {
    return e.message;
  }
};

export const GetByID = async (technicianId: string) => {
  const db = await connectPostgres();
  try {
    const technician = await db.query(
      "SELECT name, last_name, email, phone, users.created_at, users.updated_at FROM users inner join technicians on users.id = technicians.user_id WHERE users.id = $1",
      [technicianId]
    );
    db.end();
    return technician.rows[0];
  } catch (e: any) {
    return e.message;
  }
};

export const Update = async (technicianId: string, data: IClientUpdateDto) => {
  const db = await connectPostgres();
  try {
    const oldTechnicianResult = await db.query(
      "SELECT * FROM users WHERE id = $1",
      [technicianId]
    );
    const oldTechnician = oldTechnicianResult.rows[0];

    if (!oldTechnician) {
      throw new Error("Technician not found");
    }
    if (!data.password) {
      data.password = oldTechnician.password;
    }
    if (!data.name) {
      data.name = oldTechnician.name;
    }
    if (!data.last_name) {
      data.last_name = oldTechnician.last_name;
    }
    if (!data.email) {
      data.email = oldTechnician.email;
    }
    if (!data.phone) {
      data.phone = oldTechnician.phone;
    }
    const technician = await db.query(
      "UPDATE users SET name = $1, last_name = $2, email = $3, phone = $4, password = $5 WHERE id = $6 RETURNING *",
      [
        data.name,
        data.last_name,
        data.email,
        data.phone,
        data.password,
        technicianId,
      ]
    );
    db.end();
    return technician.rows[0];
  } catch (e: any) {
    return e.message;
  }
};

export const Delete = async (technicianId: string) => {
  const db = await connectPostgres();
  try {
    await db.query("DELETE FROM users WHERE id = $1", [technicianId]);
    await db.query("DELETE FROM user_roles WHERE user_id = $1", [technicianId]);
    await db.query("DELETE FROM technicians WHERE user_id = $1", [
      technicianId,
    ]);
    db.end();
    return { message: "Technician deleted successfully" };
  } catch (e: any) {
    return e.message;
  }
};
