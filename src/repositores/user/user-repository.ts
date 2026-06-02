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

  async create(data: CreateUserDto) {
    const validateData = createUserSchema.parse(data);

    return prisma.user.create({
      data: validateData,
    });
  }
}
