import { FastifyTypedInstance } from "../../../@types/types";
import { makeVerifyAuthMiddleware } from "../../../factories/make-verify-auth-middleware";
import { createRestaurantSchema } from "../../../schema/restaurant/restaurant-schema";
import { createRestautantController } from "../../controller/restaurants/create-restaurant-controller";

export async function createRestaurant(app: FastifyTypedInstance) {
  const verifyAuth = makeVerifyAuthMiddleware(app);
  app.post(
    "/restaurant",
    {
      preHandler: [verifyAuth.handle.bind(verifyAuth)],
      schema: {
        description: "Criar Restaurant",
        tags: ["restaurant", "user"],
        body: createRestaurantSchema,
      },
    },
    createRestautantController,
  );
}
