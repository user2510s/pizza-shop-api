import { FastifyTypedInstance } from "../../../@types/types";
import { makeVerifyAuthMiddleware } from "../../../factories/make-verify-auth-middleware";
import { findProductSchema } from "../../../schema/products/products-schema";
import { findProductController } from "../../controller/products/find-products-controller";

export async function findProducts(app: FastifyTypedInstance) {
  const verifyAuth = makeVerifyAuthMiddleware(app);

  app.get(
    "/product/:id",
    {
      preHandler: [verifyAuth.handle.bind(verifyAuth)],
      schema: {
        description: "Encontrar um produto especifico",
        tags: ["products"],
        params: findProductSchema,
      },
    },
    findProductController,
  );
}
