import { prisma } from "../../lib/prisma";
import { CreateUserDto, createUserSchema } from "../../schema/user/user-schema";

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findFirst({
      where: {
        id,
      },
      omit: {
        password: true,
        id: true,
        role: true,
      },
    });
  }
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
  async verifyItemCard(productId: string) {
    return prisma.cart.findFirst({
      where: {
        productId,
      },
    });
  }

  async create(data: CreateUserDto) {
    const validateData = createUserSchema.parse(data);

    return prisma.user.create({
      data: validateData,
    });
  }
}
