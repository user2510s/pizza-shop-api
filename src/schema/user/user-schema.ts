import z from "zod";

export const createUserSchema = z.object({
  email: z.email({ error: "Precisa ser um email valido" }),
  password: z.string().min(5, { error: "Precisa ter no minimo 5 caracterios" }),
  name: z.string().min(5, { error: "Precisa ter no minimo 5 caracterios" }),
  lastName: z.string().min(5, { error: "Precisa ter no minimo 5 caracterios" }),
});

export const loginUserSchema = z.object({
  email: z.email({ error: "Precisa ser um email valido" }),
  password: z.string().min(5, { error: "Precisa ter no minimo 5 caracterios" }),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type LoginUserDto = z.infer<typeof loginUserSchema>;
