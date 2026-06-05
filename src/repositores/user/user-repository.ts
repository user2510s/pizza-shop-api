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
    return prisma.user.findMany({
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

  async create(data: CreateUserDto) {
    const validateData = createUserSchema.parse(data);

    return prisma.user.create({
      data: validateData,
    });
  }
}
