import { FastifyTypedInstance } from "../../../@types/types";
import { makeVerifyAuthMiddleware } from "../../../factories/make-verify-auth-middleware";
import { addCartSchema } from "../../../schema/cart/cart-schema";
import { addCartController } from "../../controller/cart/add-cart-controller";

export async function addItemCart(app: FastifyTypedInstance) {
  const verifyAuth = makeVerifyAuthMiddleware(app);
  app.post(
    "/cart/items",
    {
      preHandler: [verifyAuth.handle.bind(verifyAuth)],
      schema: {
        description: "Add item to card",
        tags: ["cart"],
        body: addCartSchema.omit({ userId: true }),
      },
    },
    addCartController,
  );
}
