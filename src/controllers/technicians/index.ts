import { FastifyReply, FastifyRequest } from "fastify";
import { STANDARD } from "../../constants/request";
import { handleServerError } from "../../helpers/errors.helper";
import { connectPostgres } from "../..";
import { IClientCreationDto, IClientUpdateDto } from "../../schemas/Client";
import {
  Create,
  Delete,
  GetAll,
  GetByID,
  Update,
} from "../../repo/technicians";

export const CreateTechnician = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const user_data = request.body as IClientCreationDto;
    const newTechnician = await Create(user_data);
    reply.status(STANDARD.OK.statusCode).send({ data: newTechnician });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const GetTechnicians = async (
  _: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const technicians = await GetAll();
    reply.status(STANDARD.OK.statusCode).send({ data: technicians });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const GetTechnician = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const { id } = request.params as { id: string };
    const technician = await GetByID(id);
    reply.status(STANDARD.OK.statusCode).send({ data: technician });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const UpdateTechnician = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const { id } = request.params as { id: string };
    const user_data = request.body as IClientUpdateDto;
    const technician = await Update(id, user_data);
    reply.status(STANDARD.OK.statusCode).send({ data: technician });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const DeleteTechnician = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const { id } = request.params as { id: string };
    const deleteTechnician = await Delete(id);
    reply.status(STANDARD.OK.statusCode).send({ data: deleteTechnician });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};
