import { FastifyTypedInstance } from "../../../@types/types";
import { makeVerifyAuthMiddleware } from "../../../factories/make-verify-auth-middleware";
import { findProductSchema } from "../../../schema/products/products-schema";
import { deleteProductController } from "../../controller/products/delete-products-controller";

export async function deleteProduct(app: FastifyTypedInstance) {
  const verifyAuth = makeVerifyAuthMiddleware(app);

  app.delete(
    "/product/:id",
    {
      preHandler: [verifyAuth.handle.bind(verifyAuth)],
      schema: {
        description: "Encontrar um produto especifico",
        tags: ["products"],
        params: findProductSchema,
      },
    },
    deleteProductController,
  );
}
