import { FastifyReply, FastifyRequest } from "fastify";
import { STANDARD } from "../../constants/request";
import { handleServerError } from "../../helpers/errors.helper";
import { connectPostgres } from "../..";
import { IClientCreationDto, IClientUpdateDto } from "../../schemas/Client";
import { Create, Delete, GetAll, GetByID, Update } from "../../repo/admins";

export const CreateAdmin = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const user_data = request.body as IClientCreationDto;
    const newAdmin = await Create(user_data);
    reply.status(STANDARD.OK.statusCode).send({ data: newAdmin });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const GetAdmins = async (_: FastifyRequest, reply: FastifyReply) => {
  const db = await connectPostgres();
  try {
    const admins = await GetAll();
    reply.status(STANDARD.OK.statusCode).send({ data: admins });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const GetAdmin = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const { id } = request.params as { id: string };
    const admin = await GetByID(id);
    reply.status(STANDARD.OK.statusCode).send({ data: admin });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const UpdateAdmin = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const { id } = request.params as { id: string };
    const user_data = request.body as IClientUpdateDto;
    const admin = await Update(id, user_data);
    reply.status(STANDARD.OK.statusCode).send({ data: admin });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const DeleteAdmin = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const { id } = request.params as { id: string };
    const deleteAdmin = await Delete(id);
    reply.status(STANDARD.OK.statusCode).send({ data: deleteAdmin });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};
