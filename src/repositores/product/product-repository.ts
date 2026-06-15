import { prisma } from "../../lib/prisma";
import {
  CreateProductDto,
  createProductsSchema,
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
  async deleteProduct(id: string, userId: string) {
    return prisma.products.delete({
      where: {
        id,
        userId,
      },
    });
  }
  async findProduct(id: string) {
    return prisma.products.findFirst({
      where: {
        id,
      },
      omit: {
        userId: true,
      },
    });
  }
  async create(data: CreateProductDto) {
    const validateData = createProductsSchema.parse(data);

    return prisma.products.create({
      data: validateData,
    });
  }
}
