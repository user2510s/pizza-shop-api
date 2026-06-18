import z from "zod";

export const createRestaurantSchema = z.object({
  userId: z.uuid().optional(),
  name: z.string().default("restaurant"),
  address: z
    .string()
    .default("R. Henrique, 612 - Retiro, Rio de Janeiro - RJ, 256342-331"),
  openingTime: z.string().default("17:00"),
  closingTime: z.string().default("23:00"),
});

export type CreateRestaurantDto = z.infer<typeof createRestaurantSchema>;
