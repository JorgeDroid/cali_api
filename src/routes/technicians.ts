import { FastifyInstance } from "fastify";
import { clientCreationSchema, clientUpdateSchema } from "../schemas/Client";
import * as controllers from "../controllers";

import { utils } from "../utils";
// import { checkValidRequest, checkValidUser } from "../helpers/auth.helper";

async function techniciansRouter(fastify: FastifyInstance) {
  fastify.get(
    "/technicians",
    {
      config: {
        description: "Get all technicians",
      },
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.GetTechnicians
  );

  fastify.get(
    "/technicians/:id",
    {
      config: {
        description: "Get technician by id",
      },
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.GetTechnician
  );

  fastify.post(
    "/technicians",
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
        description: "Create Technician",
      },
      preValidation: utils.preValidation(clientCreationSchema),
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.CreateTechnician
  );

  fastify.put(
    "/technicians/:id",
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
        description: "Update Technician",
      },
      preValidation: utils.preValidation(clientUpdateSchema),
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.UpdateTechnician
  );

  fastify.delete(
    "/technicians/:id",
    {
      config: {
        description: "Delete Technician",
      },
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.DeleteTechnician
  );
}

export default techniciansRouter;
