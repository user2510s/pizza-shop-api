import z from "zod";

export const addCartSchema = z.object({
  userId: z.uuid().optional(),
  productId: z.string(),
});
export const addCartSchemaBody = z.object({
  productId: z.uuid(),
});
export type CartUserDto = z.infer<typeof addCartSchema>;
