import { connectPostgres } from "../..";
import { IVehicleCreationDto, IVehicleUpdateDto } from "../../schemas/Vehicles";

export class VehicleRepo {
  static Create = async (data: IVehicleCreationDto) => {
    const db = await connectPostgres();
    try {
      const vehicle = await db.query(
        "INSERT INTO vehicles (client_id, model_id, year, plate, color, name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          data.client_id,
          data.model_id,
          data.year,
          data.plate,
          data.color,
          data.name,
        ]
      );
      db.end();
      return vehicle.rows[0];
    } catch (e: any) {
      return e.message;
    }
  };

  static GetAll = async () => {
    const db = await connectPostgres();
    try {
      const vehicles = await db.query("SELECT * FROM vehicles");
      db.end();
      return vehicles.rows;
    } catch (e: any) {
      return e.message;
    }
  };

  static GetByID = async (vehicleId: string) => {
    const db = await connectPostgres();
    try {
      const vehicle = await db.query("SELECT * FROM vehicles WHERE id = $1", [
        vehicleId,
      ]);
      db.end();
      return vehicle.rows[0];
    } catch (e: any) {
      return e.message;
    }
  };

  static Update = async (vehicleId: string, data: IVehicleUpdateDto) => {
    const db = await connectPostgres();
    try {
      const oldVehicleResult = await db.query(
        "SELECT * FROM vehicles WHERE id = $1",
        [vehicleId]
      );
      const oldVehicle = oldVehicleResult.rows[0];

      if (!oldVehicle) {
        throw new Error("Vehicle not found");
      }
      if (!data.name) {
        data.name = oldVehicle.name;
      }
      if (!data.model_id) {
        data.model_id = oldVehicle.model_id;
      }
      if (!data.year) {
        data.year = oldVehicle.year;
      }
      if (!data.plate) {
        data.plate = oldVehicle.plate;
      }
      if (!data.color) {
        data.color = oldVehicle.color;
      }
      const vehicle = await db.query(
        "UPDATE vehicles SET client_id = $1, model_id = $2, year = $3, plate = $4, color = $5, name = $6 WHERE id = $7 RETURNING *",
        [
          data.client_id,
          data.model_id,
          data.year,
          data.plate,
          data.color,
          data.name,
          vehicleId,
        ]
      );
      db.end();
      return vehicle.rows[0];
    } catch (e: any) {
      return e.message;
    }
  };

  static Delete = async (vehicleId: string) => {
    const db = await connectPostgres();
    try {
      await db.query("DELETE FROM vehicles WHERE id = $1", [vehicleId]);
      db.end();
      return { message: "Model deleted successfully" };
    } catch (e: any) {
      return e.message;
    }
  };
}
