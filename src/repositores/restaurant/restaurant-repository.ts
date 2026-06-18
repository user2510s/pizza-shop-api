import { prisma } from "../../lib/prisma";
import {
  CreateRestaurantDto,
  createRestaurantSchema,
} from "../../schema/restaurant/restaurant-schema";

export class RestaurantRepositore {
  async findById(userId: string) {
    return prisma.restaurant.findUnique({
      where: {
        userId,
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
