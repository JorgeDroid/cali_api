import { connectPostgres } from "../..";
import { IClientCreationDto, IClientUpdateDto } from "../../schemas/Client";

export const Create = async (data: IClientCreationDto) => {
  const db = await connectPostgres();
  try {
    const user = await db.query(
      "INSERT INTO  (name, last_name, email, phone, password) VALUES ($1,$2, $3, $4, $5) RETURNING *",
      [data.name, data.last_name, data.email, data.phone, data.password]
    );
    const newClient = user.rows[0];
    const clientRole = await db.query("SELECT * FROM roles WHERE name = $1", [
      "Client",
    ]);
    await db.query(
      "INSERT INTO user_roles (user_id, role_id) VALUES ($1,$2) RETURNING *",
      [newClient.id, clientRole.rows[0].id]
    );
    return newClient;
    db.end();
  } catch (e: any) {
    return e.message;
  }
};

export const GetAll = async () => {
  console.log("GetAll");
  const db = await connectPostgres();
  try {
    const clients = await db.query("SELECT * FROM users");
    db.end();
    return clients.rows;
  } catch (e: any) {
    return e.message;
  }
};

export const GetByID = async (clientId: string) => {
  const db = await connectPostgres();
  try {
    const client = await db.query("SELECT * FROM clients WHERE id = $1", [
      clientId,
    ]);
    db.end();
    return client.rows[0];
  } catch (e: any) {
    return e.message;
  }
};

export const Update = async (clientId: string, data: IClientUpdateDto) => {
  const db = await connectPostgres();
  try {
    const client = await db.query(
      "UPDATE clients SET name = $1, last_name = $2, email = $3, phone = $4, password = $5 WHERE id = $6 RETURNING *",
      [
        data.name,
        data.last_name,
        data.email,
        data.phone,
        data.password,
        clientId,
      ]
    );
    db.end();
    return client.rows[0];
  } catch (e: any) {
    return e.message;
  }
};

export const Delete = async (clientId: string) => {
  const db = await connectPostgres();
  try {
    await db.query("DELETE FROM clients WHERE id = $1", [clientId]);

    db.end();
    return { message: "Client deleted successfully" };
  } catch (e: any) {
    return e.message;
  }
};
