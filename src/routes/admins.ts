import { FastifyInstance } from "fastify";
import { clientCreationSchema, clientUpdateSchema } from "../schemas/Client";
import * as controllers from "../controllers";

import { utils } from "../utils";
// import { checkValidRequest, checkValidUser } from "../helpers/auth.helper";

async function adminsRouter(fastify: FastifyInstance) {
  fastify.get(
    "/admins",
    {
      config: {
        description: "Get all admins",
      },
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.GetAdmins
  );

  fastify.get(
    "/admins/:id",
    {
      config: {
        description: "Get admin by id",
      },
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.GetAdmin
  );

  fastify.post(
    "/admins",
    {
      schema: {
        body: {
          type: "object",
          required: ["name", "last_name", "email", "phone", "password"],
          properties: {
            name: { type: "string" },
            last_name: { type: "string" },
            email: { type: "string", format: "email" },
            phone: { type: "string" },
            password: { type: "string", minLength: 8 },
          },
        },
      },
      config: {
        description: "Create Admin",
      },
      preValidation: utils.preValidation(clientCreationSchema),
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.CreateAdmin
  );

  fastify.put(
    "/admins/:id",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            last_name: { type: "string" },
            email: { type: "string", format: "email" },
            phone: { type: "string" },
            password: { type: "string", minLength: 8 },
          },
        },
      },
      config: {
        description: "Update Admin",
      },
      preValidation: utils.preValidation(clientUpdateSchema),
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.UpdateAdmin
  );

  fastify.delete(
    "/admins/:id",
    {
      config: {
        description: "Delete Admin",
      },
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.DeleteAdmin
  );
}

export default adminsRouter;
