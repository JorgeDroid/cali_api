import { connectPostgres } from "../..";
import { IModelCreationDto, IModelUpdateDto } from "../../schemas/Models";

export class ModelRepo {
  static Create = async (data: IModelCreationDto) => {
    const db = await connectPostgres();
    try {
      const model = await db.query(
        "INSERT INTO models (name, brand_id) VALUES ($1, $2) RETURNING *",
        [data.name, data.brand_id]
      );
      db.end();
      return model.rows[0];
    } catch (e: any) {
      return e.message;
    }
  };

  static GetAll = async () => {
    const db = await connectPostgres();
    try {
      const models = await db.query("SELECT * FROM models");
      db.end();
      return models.rows;
    } catch (e: any) {
      return e.message;
    }
  };

  static GetByID = async (modelId: string) => {
    const db = await connectPostgres();
    try {
      const model = await db.query("SELECT * FROM models WHERE id = $1", [
        modelId,
      ]);
      db.end();
      return model.rows[0];
    } catch (e: any) {
      return e.message;
    }
  };

  static Update = async (modelId: string, data: IModelUpdateDto) => {
    const db = await connectPostgres();
    try {
      const oldModelResult = await db.query(
        "SELECT * FROM models WHERE id = $1",
        [modelId]
      );
      const oldModel = oldModelResult.rows[0];

      if (!oldModel) {
        throw new Error("Model not found");
      }
      if (!data.name) {
        data.name = oldModel.name;
      }
      if (!data.brand_id) {
        data.brand_id = oldModel.brand_id;
      }
      const model = await db.query(
        "UPDATE models SET name = $1, brand_id = $2 WHERE id = $3 RETURNING *",
        [data.name, data.brand_id, modelId]
      );
      db.end();
      return model.rows[0];
    } catch (e: any) {
      return e.message;
    }
  };

  static Delete = async (modelId: string) => {
    const db = await connectPostgres();
    try {
      await db.query("DELETE FROM models WHERE id = $1", [modelId]);
      db.end();
      return { message: "Model deleted successfully" };
    } catch (e: any) {
      return e.message;
    }
  };
}
