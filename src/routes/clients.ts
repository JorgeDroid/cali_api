import { FastifyInstance } from "fastify";
import { clientCreationSchema, clientUpdateSchema } from "../schemas/Client";
import * as controllers from "../controllers";

import { utils } from "../utils";
import { checkValidRequest, checkValidUser } from "../helpers/auth.helper";

async function clientsRouter(fastify: FastifyInstance) {
  fastify.get(
    "/clients",
    {
      config: {
        description: "Get all clients",
      },
      preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.GetClients
  );

  fastify.get(
    "/clients/:id",
    {
      config: {
        description: "Get client by id",
      },
      preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.GetClient
  );

  fastify.post(
    "/clients",
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
        description: "Create Client",
      },
      preValidation: utils.preValidation(clientCreationSchema),
      preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.CreateClient
  );

  fastify.put(
    "/clients",
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
        description: "Update Client",
      },
      preValidation: utils.preValidation(clientUpdateSchema),
      preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.UpdateClient
  );

  fastify.delete(
    "/clients/:id",
    {
      config: {
        description: "Delete Client",
      },
      preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.DeleteClient
  );
}

export default clientsRouter;
