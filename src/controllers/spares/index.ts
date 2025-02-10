import { FastifyReply, FastifyRequest } from "fastify";
import { STANDARD } from "../../constants/request";
import { handleServerError } from "../../helpers/errors.helper";
import { connectPostgres } from "../..";
import {} from "../../schemas/Spares";
import { SpareRepo } from "../../repo/spares";
import { ISpareCreationDto, ISpareUpdateDto } from "../../schemas/Spares";

export const CreateSpare = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const spare_data = request.body as ISpareCreationDto;
    const newSpare = await SpareRepo.Create(spare_data);
    reply.status(STANDARD.OK.statusCode).send({ data: newSpare });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const GetSpares = async (_: FastifyRequest, reply: FastifyReply) => {
  const db = await connectPostgres();
  try {
    const spares = await SpareRepo.GetAll();
    reply.status(STANDARD.OK.statusCode).send({ data: spares });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const GetSpare = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const { id } = request.params as { id: string };
    const spare = await SpareRepo.GetByID(id);
    reply.status(STANDARD.OK.statusCode).send({ data: spare });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const UpdateSpare = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const { id } = request.params as { id: string };
    const spare_data = request.body as ISpareUpdateDto;
    const spare = await SpareRepo.Update(id, spare_data);
    reply.status(STANDARD.OK.statusCode).send({ data: spare });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const DeleteSpare = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const { id } = request.params as { id: string };
    const deleteSpare = await SpareRepo.Delete(id);
    reply.status(STANDARD.OK.statusCode).send({ data: deleteSpare });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};
