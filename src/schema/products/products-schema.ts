import z from "zod";

export const createProductsSchema = z.object({
  userId: z.uuid(),
  name: z.string().default("product"),
  pricing: z.number().default(100),
  description: z.string(),
  tags: z.array(z.string()).default(["mussarela", "borda-larga"]),
});

export const findProductSchema = z.object({
  id: z.uuid(),
});

export const deleteProductSchema = z.object({
  id: z.uuid(),
  userId: z.uuid().optional(),
});

export type CreateProductDto = z.infer<typeof createProductsSchema>;
export type FindProductDto = z.infer<typeof findProductSchema>;
export type DeleteProductDto = z.infer<typeof deleteProductSchema>;
