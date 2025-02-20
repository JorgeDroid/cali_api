import { FastifyReply, FastifyRequest } from "fastify";
import { STANDARD } from "../../constants/request";
import { handleServerError } from "../../helpers/errors.helper";
import { connectPostgres } from "../..";
import { IClientCreationDto, IClientUpdateDto } from "../../schemas/Client";
import { ClientRepo } from "../../repo/clients";

export const CreateClient = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const user_data = request.body as IClientCreationDto;
    const newClient = await ClientRepo.Create(user_data);
    reply.status(STANDARD.OK.statusCode).send({ data: newClient });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const GetClients = async (_: FastifyRequest, reply: FastifyReply) => {
  const db = await connectPostgres();
  try {
    const clients = await ClientRepo.GetAll();
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
    const client = await ClientRepo.GetByID(id);
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
    const client = await ClientRepo.Update(id, user_data);
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
    const deleteClient = await ClientRepo.Delete(id);
    reply.status(STANDARD.OK.statusCode).send({ data: deleteClient });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};
