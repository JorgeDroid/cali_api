import { FastifyReply, FastifyRequest } from "fastify";
import { STANDARD } from "../../constants/request";
import { handleServerError } from "../../helpers/errors.helper";
import { connectPostgres } from "../..";
import { IModelCreationDto, IModelUpdateDto } from "../../schemas/Models";
import { ModelRepo } from "../../repo";

export const CreateModel = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const model_data = request.body as IModelCreationDto;
    const newModel = await ModelRepo.Create(model_data);
    reply.status(STANDARD.OK.statusCode).send({ data: newModel });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const GetModels = async (_: FastifyRequest, reply: FastifyReply) => {
  const db = await connectPostgres();
  try {
    const models = await ModelRepo.GetAll();
    reply.status(STANDARD.OK.statusCode).send({ data: models });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const GetModel = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const { id } = request.params as { id: string };
    const model = await ModelRepo.GetByID(id);
    reply.status(STANDARD.OK.statusCode).send({ data: model });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const UpdateModel = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const { id } = request.params as { id: string };
    const model_data = request.body as IModelUpdateDto;
    const model = await ModelRepo.Update(id, model_data);
    reply.status(STANDARD.OK.statusCode).send({ data: model });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const DeleteModel = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await connectPostgres();
  try {
    const { id } = request.params as { id: string };
    const deleteModel = await ModelRepo.Delete(id);
    reply.status(STANDARD.OK.statusCode).send({ data: deleteModel });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};
