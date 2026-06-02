import z from "zod";

export const createUserSchema = z.object({
  email: z.email(),
  password: z.string(),
  name: z.string(),
  lastName: z.string(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
