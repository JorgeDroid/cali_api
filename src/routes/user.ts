import { FastifyInstance } from "fastify";
import { Create } from "../controllers/user";
// import { User } from "../models/user";

async function routes(fastify: FastifyInstance) {
  //   fastify.get("/users", async (_, reply) => {
  //     try {
  //       const controller = new UserController();
  //       const res = await controller.getUsers();
  //       console.log("resto", res);
  //       return { status: "success", data: res };
  //     } catch (error: any) {
  //       reply.send({ status: "error", message: error });
  //     }
  //   });

  fastify.post("/users", async (request, reply) => {
    try {
      const res = await Create(request, reply);
      return { status: "success", data: res };
    } catch (error: any) {
      reply.send({ status: "error", message: error });
    }
  });

  //   fastify.post("/users", async (request, reply) => {
  //     const user: User = request.body;
  //     try {
  //       const pool = request.mongo.db;
  //       const res = await pool.query(
  //         "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *",
  //         [user.username, user.email]
  //       );
  //       return { status: "success", data: res.rows[0] };
  //     } catch (error) {
  //       reply.send({ status: "error", message: error.message });
  //     }
  //   });
}

export default routes;
