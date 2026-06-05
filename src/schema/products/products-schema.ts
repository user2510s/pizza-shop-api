import z from "zod";

export const creteProductsSchema = z.object({
  userId: z.string(),
  name: z.string(),
  pricing: z.string(),
  description: z.string(),
  tags: z.array(z.string()).default(["mussarela", "borda-larga"]),
});

export type CreateProductDto = z.infer<typeof creteProductsSchema>;
