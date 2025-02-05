import { FastifyReply, FastifyRequest } from "fastify";
import { STANDARD } from "../../constants/request";
import { handleServerError } from "../../helpers/errors.helper";
import { connectPostgres } from "../..";
import { IClientCreationDto, IClientUpdateDto } from "../../schemas/Client";
import { Create, Delete, GetAll, GetByID, Update } from "../../repo/clients";

export const CreateClient = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const user_data = request.body as IClientCreationDto;
    const newClient = await Create(user_data);
    reply.status(STANDARD.OK.statusCode).send({ data: newClient });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const GetClients = async (_: FastifyRequest, reply: FastifyReply) => {
  const db = await connectPostgres();
  try {
    const clients = await GetAll();
    reply.status(STANDARD.OK.statusCode).send({ data: clients });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const GetClient = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const { id } = request.params as { id: string };
    const client = await GetByID(id);
    reply.status(STANDARD.OK.statusCode).send({ data: client });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const UpdateClient = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const { id } = request.params as { id: string };
    const user_data = request.body as IClientUpdateDto;
    const client = await Update(id, user_data);
    reply.status(STANDARD.OK.statusCode).send({ data: client });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const DeleteClient = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const { id } = request.params as { id: string };
    const deleteClient = await Delete(id);
    reply.status(STANDARD.OK.statusCode).send({ data: deleteClient });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};
