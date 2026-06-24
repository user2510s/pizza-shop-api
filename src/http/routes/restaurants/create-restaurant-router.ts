import { FastifyTypedInstance } from "../../../@types/types";
import { makeVerifyAuthMiddleware } from "../../../factories/make-verify-auth-middleware";
import { createRestautantController } from "../../controller/restaurants/create-restaurant-controller";
import { createRestaurantSchema } from "../../../schema/restaurant/restaurant-schema";

export async function createRestaurant(app: FastifyTypedInstance) {
  const verifyAuth = makeVerifyAuthMiddleware(app);
  app.post(
    "/restaurant",
    {
      preHandler: [verifyAuth.handle.bind(verifyAuth)],
      schema: {
        description: "Criar Restaurant",
        tags: ["restaurant"],
        body: createRestaurantSchema.omit({ userId: true }),
      },
    },
    createRestautantController,
  );
}
