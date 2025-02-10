import { connectPostgres } from "../..";
import { IMediaCreationDto, IMediaUpdateDto } from "../../schemas/Media";

export const Create = async (data: IMediaCreationDto) => {
  const db = await connectPostgres();
  try {
    const media = await db.query(
      "INSERT INTO media (url,name,type) VALUES ($1, $2, $3) RETURNING *",
      [data.url, data.name]
    );
    db.end();
    return media.rows[0];
  } catch (e: any) {
    return e.message;
  }
};

export const GetAll = async () => {
  const db = await connectPostgres();
  try {
    const media = await db.query("SELECT * FROM media");
    db.end();
    return media.rows;
  } catch (e: any) {
    return e.message;
  }
};

export const GetByID = async (mediaId: string) => {
  const db = await connectPostgres();
  try {
    const media = await db.query("SELECT * FROM media WHERE id = $1", [
      mediaId,
    ]);
    db.end();
    return media.rows[0];
  } catch (e: any) {
    return e.message;
  }
};

export const Update = async (mediaId: string, data: IMediaUpdateDto) => {
  const db = await connectPostgres();
  try {
    const oldMediaResult = await db.query("SELECT * FROM media WHERE id = $1", [
      mediaId,
    ]);
    const oldMedia = oldMediaResult.rows[0];

    if (!oldMedia) {
      throw new Error("Media not found");
    }
    if (!data.url) {
      data.url = oldMedia.url;
    }
    if (!data.name) {
      data.name = oldMedia.name;
    }
    const media = await db.query(
      "UPDATE media SET url = $1, name = $2 WHERE id = $3 RETURNING *",
      [data.url, data.name, mediaId]
    );
    db.end();
    return media.rows[0];
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
