import { connectPostgres } from "../..";
import { IBrandCreationDto, IBrandUpdateDto } from "../../schemas/Brands";

export class BrandRepo {
  static Create = async (data: IBrandCreationDto) => {
    const db = await connectPostgres();
    try {
      const brand = await db.query(
        "INSERT INTO brands (name) VALUES ($1) RETURNING *",
        [data.name]
      );
      db.end();
      return brand.rows[0];
    } catch (e: any) {
      return e.message;
    }
  };

  static GetAll = async () => {
    const db = await connectPostgres();
    try {
      const brands = await db.query("SELECT * FROM brands");
      db.end();
      return brands.rows;
    } catch (e: any) {
      return e.message;
    }
  };

  static GetByID = async (brandId: string) => {
    const db = await connectPostgres();
    try {
      const brand = await db.query("SELECT * FROM brands WHERE id = $1", [
        brandId,
      ]);
      db.end();
      return brand.rows[0];
    } catch (e: any) {
      return e.message;
    }
  };

  static Update = async (brandId: string, data: IBrandUpdateDto) => {
    const db = await connectPostgres();
    try {
      const oldBrandResult = await db.query(
        "SELECT * FROM brands WHERE id = $1",
        [brandId]
      );
      const oldBrand = oldBrandResult.rows[0];

      if (!oldBrand) {
        throw new Error("Brand not found");
      }
      if (!data.name) {
        data.name = oldBrand.name;
      }
      const brand = await db.query(
        "UPDATE brands SET name = $1 WHERE id = $2 RETURNING *",
        [data.name, brandId]
      );
      db.end();
      return brand.rows[0];
    } catch (e: any) {
      return e.message;
    }
  };

  static Delete = async (brandId: string) => {
    const db = await connectPostgres();
    try {
      await db.query("DELETE FROM brands WHERE id = $1", [brandId]);
      db.end();
      return { message: "Client deleted successfully" };
    } catch (e: any) {
      return e.message;
    }
  };
}
