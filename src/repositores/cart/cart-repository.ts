import { prisma } from "../../lib/prisma";

export class CartRepository {
  async createCart(productId: string, userId: string) {
    return prisma.cart.create({
      data: {
        productId,
        userId,
      },
    });
  }

  async getItemsCart(userId: string) {
    return prisma.cart.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            pricing: true,
          },
        },
      },
    });
  }

  async verifyItemCart(productId: string) {
    return prisma.cart.findFirst({
      where: {
        productId,
      },
    });
  }
}
