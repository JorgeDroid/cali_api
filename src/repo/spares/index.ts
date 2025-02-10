import { connectPostgres } from "../..";
import { ISpareCreationDto, ISpareUpdateDto } from "../../schemas/Spares";

export class SpareRepo {
  static Create = async (data: ISpareCreationDto) => {
    const db = await connectPostgres();
    try {
      const spare = await db.query(
        "INSERT INTO spares (name, model_id, sku, code, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [data.name, data.model_id, data.sku, data.code, data.price]
      );
      db.end();
      return spare.rows[0];
    } catch (e: any) {
      return e.message;
    }
  };

  static GetAll = async () => {
    const db = await connectPostgres();
    try {
      const spares = await db.query("SELECT * FROM spares");
      db.end();
      return spares.rows;
    } catch (e: any) {
      return e.message;
    }
  };

  static GetByID = async (spareId: string) => {
    const db = await connectPostgres();
    try {
      const spare = await db.query("SELECT * FROM spares WHERE id = $1", [
        spareId,
      ]);
      db.end();
      return spare.rows[0];
    } catch (e: any) {
      return e.message;
    }
  };

  static Update = async (spareId: string, data: ISpareUpdateDto) => {
    const db = await connectPostgres();
    try {
      const oldSpareResult = await db.query(
        "SELECT * FROM spares WHERE id = $1",
        [spareId]
      );
      const oldSpare = oldSpareResult.rows[0];

      if (!oldSpare) {
        throw new Error("Spare not found");
      }
      if (!data.name) {
        data.name = oldSpare.name;
      }
      if (!data.model_id) {
        data.model_id = oldSpare.model_id;
      }
      if (!data.sku) {
        data.sku = oldSpare.sku;
      }
      if (!data.code) {
        data.code = oldSpare.code;
      }
      if (!data.price) {
        data.price = oldSpare.price;
      }
      const spare = await db.query(
        "UPDATE spares SET name = $1, model_id = $2, sku = $3, code = $4, price = $5 WHERE id = $6 RETURNING *",
        [data.name, data.model_id, data.sku, data.code, data.price, spareId]
      );
      db.end();
      return spare.rows[0];
    } catch (e: any) {
      return e.message;
    }
  };

  static Delete = async (spareId: string) => {
    const db = await connectPostgres();
    try {
      await db.query("DELETE FROM spares WHERE id = $1", [spareId]);
      db.end();
      return { message: "Model deleted successfully" };
    } catch (e: any) {
      return e.message;
    }
  };
}
