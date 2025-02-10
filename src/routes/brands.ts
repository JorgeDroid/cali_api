import { FastifyInstance } from "fastify";
import { clientUpdateSchema, brandCreationSchema } from "../schemas/Client";
import * as controllers from "../controllers";

import { utils } from "../utils";
// import { checkValidRequest, checkValidUser } from "../helpers/auth.helper";

async function clientsRouter(fastify: FastifyInstance) {
  fastify.get(
    "/brands",
    {
      config: {
        description: "Get all brands",
      },
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.GetBrands
  );

  fastify.get(
    "/brands/:id",
    {
      config: {
        description: "Get brand by id",
      },
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.GetBrand
  );

  fastify.post(
    "/brands",
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
        description: "Create Brand",
      },
      preValidation: utils.preValidation(brandCreationSchema),
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.CreateBrand
  );

  fastify.put(
    "/brands/:id",
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
        description: "Update Brand",
      },
      preValidation: utils.preValidation(clientUpdateSchema),
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.UpdateBrand
  );

  fastify.delete(
    "/brands/:id",
    {
      config: {
        description: "Delete Client",
      },
      // preHandler: [checkValidRequest, checkValidUser],
    },
    controllers.DeleteBrand
  );
}

export default clientsRouter;
