import { connectPostgres } from "../..";
import { IServiceCreationDto, IServiceUpdateDto } from "../../schemas/Services";
import { IVehicleCreationDto, IVehicleUpdateDto } from "../../schemas/Vehicles";

export const Create = async (data: IServiceCreationDto) => {
  const db = await connectPostgres();
  try {
    const service = await db.query(
      "INSERT INTO services (vehicle_id, technician_id, status) VALUES ($1, $2, $3) RETURNING *",
      [data.vehicle_id, data.technician_id, data.status]
    );
    db.end();
    return service.rows[0];
  } catch (e: any) {
    return e.message;
  }
};

export const GetAll = async () => {
  const db = await connectPostgres();
  try {
    const services = await db.query("SELECT * FROM services");
    db.end();
    return services.rows;
  } catch (e: any) {
    return e.message;
  }
};

export const GetByID = async (serviceId: string) => {
  const db = await connectPostgres();
  try {
    const service = await db.query("SELECT * FROM services WHERE id = $1", [
      serviceId,
    ]);
    db.end();
    return service.rows[0];
  } catch (e: any) {
    return e.message;
  }
};

export const Update = async (serviceId: string, data: IServiceUpdateDto) => {
  const db = await connectPostgres();
  try {
    const oldServiceResult = await db.query(
      "SELECT * FROM services WHERE id = $1",
      [serviceId]
    );
    const oldService = oldServiceResult.rows[0];

    if (!oldService) {
      throw new Error("Service not found");
    }
    if (!data.vehicle_id) {
      data.vehicle_id = oldService.vehicle_id;
    }
    if (!data.technician_id) {
      data.technician_id = oldService.technician_id;
    }
    if (!data.status) {
      data.status = oldService.status;
    }
    const service = await db.query(
      "UPDATE services SET vehicle_id = $1, technician_id = $2, status = $3 WHERE id = $4 RETURNING *",
      [data.vehicle_id, data.technician_id, data.status, serviceId]
    );
    db.end();
    return service.rows[0];
  } catch (e: any) {
    return e.message;
  }
};

export const Delete = async (modelId: string) => {
  const db = await connectPostgres();
  try {
    await db.query("DELETE FROM models WHERE id = $1", [modelId]);
    db.end();
    return { message: "Model deleted successfully" };
  } catch (e: any) {
    return e.message;
  }
};
