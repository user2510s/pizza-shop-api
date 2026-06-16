import { FastifyTypedInstance } from "../../../@types/types";
import { makeVerifyAuthMiddleware } from "../../../factories/make-verify-auth-middleware";
import { cartUserSchema } from "../../../schema/user/user-schema";
import { cartUserController } from "../../controller/users/cart-user-controller";

export async function cartUser(app: FastifyTypedInstance) {
  const verifyAuth = makeVerifyAuthMiddleware(app);
  app.post(
    "/user/cart",
    {
      preHandler: [verifyAuth.handle.bind(verifyAuth)],
      schema: {
        description: "Add item to card",
        tags: ["user"],
        body: cartUserSchema,
      },
    },
    cartUserController,
  );
}
