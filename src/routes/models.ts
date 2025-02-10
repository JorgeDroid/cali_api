import { FastifyInstance } from "fastify";
import { modelCreationSchema, modelUpdateSchema } from "../schemas/Models";
import * as controllers from "../controllers";

import { utils } from "../utils";
// import { checkValidRequest, checkValidUser } from "../helpers/auth.helper";

async function modelsRouter(fastify: FastifyInstance) {
  fastify.get(
    "/models",
    {
      config: {
        description: "Get all brands",
      },
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.GetModels
  );

  fastify.get(
    "/models/:id",
    {
      config: {
        description: "Get model by id",
      },
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.GetModel
  );

  fastify.post(
    "/models",
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
    controllers.CreateModel
  );

  fastify.put(
    "/models/:id",
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
    controllers.UpdateModel
  );

  fastify.delete(
    "/models/:id",
    {
      config: {
        description: "Delete Model",
      },
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.DeleteModel
  );
}

export default modelsRouter;
