import { connectPostgres } from "../..";
import { ILabourCreationDto, ILabourUpdateDto } from "../../schemas/Labours";

export class LabourRepo {
  static Create = async (data: ILabourCreationDto) => {
    const db = await connectPostgres();
    try {
      const labour = await db.query(
        "INSERT INTO labours (technician_id, price, description) VALUES ($1, $2, $3) RETURNING *",
        [data.technician_id, data.price, data.description]
      );
      db.end();
      return labour.rows[0];
    } catch (e: any) {
      return e.message;
    }
  };

  static GetAll = async () => {
    const db = await connectPostgres();
    try {
      const labours = await db.query("SELECT * FROM labours");
      db.end();
      return labours.rows;
    } catch (e: any) {
      return e.message;
    }
  };

  static GetByID = async (labourId: string) => {
    const db = await connectPostgres();
    try {
      const labour = await db.query("SELECT * FROM labours WHERE id = $1", [
        labourId,
      ]);
      db.end();
      return labour.rows[0];
    } catch (e: any) {
      return e.message;
    }
  };

  static Update = async (labourId: string, data: ILabourUpdateDto) => {
    const db = await connectPostgres();
    try {
      const oldLabourResult = await db.query(
        "SELECT * FROM labours WHERE id = $1",
        [labourId]
      );
      const oldLabour = oldLabourResult.rows[0];

      if (!oldLabour) {
        throw new Error("Labour not found");
      }
      if (!data.technician_id) {
        data.technician_id = oldLabour.technician_id;
      }
      if (!data.price) {
        data.price = oldLabour.price;
      }
      if (!data.description) {
        data.description = oldLabour.description;
      }
      const labour = await db.query(
        "UPDATE labours SET technician_id = $1, price = $2, description = $3 WHERE id = $4 RETURNING *",
        [data.technician_id, data.price, data.description, labourId]
      );
      db.end();
      return labour.rows[0];
    } catch (e: any) {
      return e.message;
    }
  };

  static Delete = async (labourId: string) => {
    const db = await connectPostgres();
    try {
      await db.query("DELETE FROM labours WHERE id = $1", [labourId]);
      db.end();
      return { message: "Labour deleted successfully" };
    } catch (e: any) {
      return e.message;
    }
  };
}
