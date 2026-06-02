import z from "zod";
import { prisma } from "../../lib/prisma";

const createUserSchema = z.object({
  email: z.email(),
  password: z.string(),
  name: z.string(),
  lastName: z.string(),
});

type CreateUserDto = z.infer<typeof createUserSchema>;

export class UserRepositort {
  async create(data: CreateUserDto) {
    const validateData = createUserSchema.parse(data);

    return prisma.user.create({
      data: validateData,
    });
  }
}
