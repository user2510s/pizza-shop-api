import { FastifyReply, FastifyRequest } from "fastify";
import { RestaurantRepositore } from "../../../repositores/restaurant/restaurant-repository";
import { CreateRestaurantService } from "../../../services/restaurant/create-restaurant-service";
import { createRestaurantSchema } from "../../../schema/restaurant/restaurant-schema";

const restaurantyRepositore = new RestaurantRepositore();
const createRestaurantService = new CreateRestaurantService(
  restaurantyRepositore,
);

export async function createRestautantController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { name, address, closingTime, openingTime } =
    createRestaurantSchema.parse(req.body);

  try {
    const restaurant = await createRestaurantService.execute({
      userId: req.user.id,
      name,
      address,
      openingTime,
      closingTime,
    });

    return rep.status(200).send(restaurant);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "USER_NOT_FOUND") {
        return rep.status(400).send({
          success: false,
          message: "Usuario não encontrado!",
        });
      }
      if (err.message === "RESTAURANT_EXISTER") {
        return rep.status(400).send({
          success: false,
          message: "Restaurante existente!",
        });
      }
      if (err.message === "USER_NOT_AUTH") {
        return rep.status(400).send({
          success: false,
          message: "Usuario não autorizado!",
        });
      }
    }
  }
}
