import { FastifyReply, FastifyRequest } from "fastify";
import { STANDARD } from "../../constants/request";
import { handleServerError } from "../../helpers/errors.helper";
import { connectPostgres } from "../..";

export const Create = async (request: FastifyRequest, reply: FastifyReply) => {
  const db = await connectPostgres();
  try {
    const user_data = request.body as { username: string; email: string };
    console.log("user_data", user_data);
    const user = await db.query(
      "INSERT INTO users (username,email) VALUES ($1,$2) RETURNING *",
      [user_data.username, user_data.email]
    );
    reply.status(STANDARD.OK.statusCode).send({ data: user.rows[0] });
    db.end();
  } catch (e) {
    handleServerError(reply, e);
  }
};
