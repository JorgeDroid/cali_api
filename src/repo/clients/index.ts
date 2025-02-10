import { connectPostgres } from "../..";
import { IClientCreationDto, IClientUpdateDto } from "../../schemas/Client";

export class ClientRepo {
  static Create = async (data: IClientCreationDto) => {
    const db = await connectPostgres();
    try {
      const user = await db.query(
        "INSERT INTO users (name, last_name, email, phone, password) VALUES ($1,$2, $3, $4, $5) RETURNING *",
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
      await db.query("INSERT INTO clients (user_id) VALUES ($1)", [
        newClient.id,
      ]);
      db.end();
      return newClient;
    } catch (e: any) {
      return e.message;
    }
  };

  static GetAll = async () => {
    const db = await connectPostgres();
    try {
      const clients = await db.query(
        "SELECT name, last_name, email, phone, users.created_at, users.updated_at FROM users inner join clients on users.id = clients.user_id "
      );
      db.end();
      return clients.rows;
    } catch (e: any) {
      return e.message;
    }
  };

  static GetByID = async (clientId: string) => {
    const db = await connectPostgres();
    try {
      const client = await db.query(
        "SELECT name, last_name, email, phone, users.created_at, users.updated_at FROM users inner join clients on users.id = clients.user_id WHERE users.id = $1",
        [clientId]
      );
      db.end();
      return client.rows[0];
    } catch (e: any) {
      return e.message;
    }
  };

  static Update = async (clientId: string, data: IClientUpdateDto) => {
    const db = await connectPostgres();
    try {
      const oldClientResult = await db.query(
        "SELECT * FROM users WHERE id = $1",
        [clientId]
      );
      const oldClient = oldClientResult.rows[0];

      if (!oldClient) {
        throw new Error("Client not found");
      }
      if (!data.password) {
        data.password = oldClient.password;
      }
      if (!data.name) {
        data.name = oldClient.name;
      }
      if (!data.last_name) {
        data.last_name = oldClient.last_name;
      }
      if (!data.email) {
        data.email = oldClient.email;
      }
      if (!data.phone) {
        data.phone = oldClient.phone;
      }
      const client = await db.query(
        "UPDATE users SET name = $1, last_name = $2, email = $3, phone = $4, password = $5 WHERE id = $6 RETURNING *",
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

  static Delete = async (clientId: string) => {
    const db = await connectPostgres();
    try {
      await db.query("DELETE FROM users WHERE id = $1", [clientId]);
      await db.query("DELETE FROM user_roles WHERE user_id = $1", [clientId]);
      await db.query("DELETE FROM clients WHERE user_id = $1", [clientId]);
      db.end();
      return { message: "Client deleted successfully" };
    } catch (e: any) {
      return e.message;
    }
  };
}
