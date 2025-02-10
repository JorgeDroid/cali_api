import { FastifyInstance } from "fastify";
import { modelCreationSchema, modelUpdateSchema } from "../schemas/Models";
import * as controllers from "../controllers";

import { utils } from "../utils";
// import { checkValidRequest, checkValidUser } from "../helpers/auth.helper";

async function sparesRouter(fastify: FastifyInstance) {
  fastify.get(
    "/spares",
    {
      config: {
        description: "Get all brands",
      },
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.GetSpares
  );

  fastify.get(
    "/spares/:id",
    {
      config: {
        description: "Get model by id",
      },
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.GetSpare
  );

  fastify.post(
    "/spares",
    {
      schema: {
        body: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string" },
          },
        },
      },
      config: {
        description: "Create Model",
      },
      preValidation: utils.preValidation(modelCreationSchema),
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.CreateSpare
  );

  fastify.put(
    "/spares/:id",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
        },
      },
      config: {
        description: "Update Model",
      },
      preValidation: utils.preValidation(modelUpdateSchema),
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.UpdateSpare
  );

  fastify.delete(
    "/spares/:id",
    {
      config: {
        description: "Delete Spare",
      },
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.DeleteSpare
  );
}

export default sparesRouter;
