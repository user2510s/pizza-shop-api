import z from "zod";

export const createProductsSchema = z.object({
  userId: z.string(),
  name: z.string(),
  pricing: z.number().default(100),
  description: z.string(),
  tags: z.array(z.string()).default(["mussarela", "borda-larga"]),
});

export type CreateProductDto = z.infer<typeof createProductsSchema>;
