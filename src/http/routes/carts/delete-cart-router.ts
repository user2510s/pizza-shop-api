import z from "zod";
import { FastifyTypedInstance } from "../../../@types/types";
import { makeVerifyAuthMiddleware } from "../../../factories/make-verify-auth-middleware";
import { removeCartController } from "../../controller/cart/delete-cart-controller";
import { removeCartSchema } from "../../../schema/cart/cart-schema";

export async function deleteItemCart(app: FastifyTypedInstance) {
  const verifyAuth = makeVerifyAuthMiddleware(app);
  app.delete(
    "/cart/items/:productId",
    {
      preHandler: [verifyAuth.handle.bind(verifyAuth)],
      schema: {
        description: "Remove item to card",
        tags: ["cart"],
        params: removeCartSchema,
      },
    },
    removeCartController,
  );
}
