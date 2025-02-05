import { utils } from "../utils";
import { FastifyRequest, FastifyReply } from "fastify";
import { ERRORS } from "./errors.helper";
import { connectPostgres } from "..";

export const checkValidRequest = (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const token = utils.getTokenFromHeader(request.headers.authorization);
  if (!token) {
    return reply
      .code(ERRORS.unauthorizedAccess.statusCode)
      .send(ERRORS.unauthorizedAccess.message);
  }

  const decoded = utils.verifyToken(token);
  if (!decoded) {
    return reply
      .code(ERRORS.unauthorizedAccess.statusCode)
      .send(ERRORS.unauthorizedAccess.message);
  }
};

export const checkValidUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const token = utils.getTokenFromHeader(request.headers.authorization);
  if (!token) {
    return reply
      .code(ERRORS.unauthorizedAccess.statusCode)
      .send(ERRORS.unauthorizedAccess.message);
  }

  const decoded = utils.verifyToken(token);
  if (!decoded || !decoded.id) {
    return reply
      .code(ERRORS.unauthorizedAccess.statusCode)
      .send(ERRORS.unauthorizedAccess.message);
  }

  try {
    const db = await connectPostgres();
    const userData = await db.query("SELECT * FROM users WHERE id = $1", [
      decoded.id,
    ]);

    if (!userData) {
      return reply
        .code(ERRORS.unauthorizedAccess.statusCode)
        .send(ERRORS.unauthorizedAccess.message);
    }

    request["authUser"] = userData.rows[0];
  } catch (e) {
    return reply
      .code(ERRORS.unauthorizedAccess.statusCode)
      .send(ERRORS.unauthorizedAccess.message);
  }
};
