import { FastifyTypedInstance } from "../../../@types/types";
import { makeVerifyAuthMiddleware } from "../../../factories/make-verify-auth-middleware";

export async function deleteItemCart(app: FastifyTypedInstance) {
  const verifyAuth = makeVerifyAuthMiddleware(app);
  app.delete(
    "/cart/items",
    {
      preHandler: [verifyAuth.handle.bind(verifyAuth)],
      schema: {
        description: "Remove item to card",
        tags: ["cart"],
        body: {},
      },
    },
    async () => {
      return;
    },
  );
}
