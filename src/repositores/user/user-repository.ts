import { prisma } from "../../lib/prisma";
import {
  CreateUserDto,
  createUserSchema,
  DeleteUserDto,
  EditUserDto,
} from "../../schema/user/user-schema";

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
      select: {
        publicId: true,
        email: true,
        name: true,
        lastName: true,
      },
    });
  }

  async verifyProduct(id: string) {
    return prisma.products.findFirst({
      where: {
        id,
      },
    });
  }

  async create(data: CreateUserDto) {
    const validateData = createUserSchema.parse(data);

    return prisma.user.create({
      data: validateData,
    });
  }

  async edit({ lastName, name, id }: EditUserDto) {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        lastName,
      },
      omit: {
        password: true,
        id: true,
        role: true,
      },
    });
  }

  async deleteUser({ id, email }: DeleteUserDto) {
    if (!id) {
      throw new Error("USER_NOT_FOUND");
    }

    return prisma.user.delete({
      where: {
        id_email: {
          id,
          email,
        },
      },
    });
  }
}
