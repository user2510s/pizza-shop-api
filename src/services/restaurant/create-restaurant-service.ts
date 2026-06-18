import { RestaurantRepositore } from "../../repositores/restaurant/restaurant-repository";
import { CreateRestaurantDto } from "../../schema/restaurant/restaurant-schema";

export class CreateRestaurantService {
  constructor(private restaurantRepository: RestaurantRepositore) {}

  async execute({
    name,
    userId,
    address,
    openingTime,
    closingTime,
  }: CreateRestaurantDto) {
    if (!userId) {
      throw new Error("USER_NOT_FOUND");
    }
    const restaurant = await this.restaurantRepository.findById(userId);

    if (restaurant) {
      throw new Error("RESTAURANT_EXISTER");
    }

    const data = await this.restaurantRepository.create({
      name,
      userId,
      address,
      openingTime,
      closingTime,
    });

    return {
      data,
    };
  }
}
