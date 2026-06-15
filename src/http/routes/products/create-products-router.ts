import { FastifyTypedInstance } from "../../../@types/types";
import { makeVerifyAuthMiddleware } from "../../../factories/make-verify-auth-middleware";
import { createProductsSchema } from "../../../schema/products/products-schema";
import { createProductsController } from "../../controller/products/create-products-controller";

export async function createProduct(app: FastifyTypedInstance) {
  const verifyAuth = makeVerifyAuthMiddleware(app);
  app.post(
    "/product",
    {
      preHandler: [verifyAuth.handle.bind(verifyAuth)],
      schema: {
        description: "Criar Produto",
        tags: ["products"],
        body: createProductsSchema,
      },
    },
    createProductsController,
  );
}
