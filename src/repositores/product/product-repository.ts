import { prisma } from "../../lib/prisma";
import {
  CreateProductDto,
  creteProductsSchema,
} from "../../schema/products/products-schema";

export class ProductRepositore {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        role: true,
      },
    });
  }
  async create(data: CreateProductDto) {
    const validateData = creteProductsSchema.parse(data);

    return prisma.products.create({
      data: validateData,
    });
  }
}
