import { prisma } from "../../lib/prisma";
import {
  CreateRestaurantDto,
  createRestaurantSchema,
} from "../../schema/restaurant/restaurant-schema";

export class RestaurantRepositore {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  async create(data: CreateRestaurantDto) {
    const validateData = createRestaurantSchema.parse(data);

    return prisma.restaurant.create({
      data: validateData,
    });
  }
}
