import { FastifyReply, FastifyRequest } from "fastify";
import { STANDARD } from "../../constants/request";
import { handleServerError } from "../../helpers/errors.helper";
import { connectPostgres } from "../..";
import { IBrandCreationDto, IBrandUpdateDto } from "../../schemas/Brands";
import { BrandRepo } from "../../repo";

export const CreateBrand = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const brand_data = request.body as IBrandCreationDto;
    const newBrand = await BrandRepo.Create(brand_data);
    reply.status(STANDARD.OK.statusCode).send({ data: newBrand });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const GetBrands = async (_: FastifyRequest, reply: FastifyReply) => {
  const db = await connectPostgres();
  try {
    const brands = await BrandRepo.GetAll();
    reply.status(STANDARD.OK.statusCode).send({ data: brands });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const GetBrand = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const { id } = request.params as { id: string };
    const brand = await BrandRepo.GetByID(id);
    reply.status(STANDARD.OK.statusCode).send({ data: brand });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const UpdateBrand = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const { id } = request.params as { id: string };
    const brand_data = request.body as IBrandUpdateDto;
    const brand = await BrandRepo.Update(id, brand_data);
    reply.status(STANDARD.OK.statusCode).send({ data: brand });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const DeleteBrand = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const { id } = request.params as { id: string };
    const deleteBrand = await BrandRepo.Delete(id);
    reply.status(STANDARD.OK.statusCode).send({ data: deleteBrand });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};
