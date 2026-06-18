import { prisma } from "../lib/prisma";

export async function calculateCartTotal(userId: string) {
  const items = await prisma.cart.findMany({
    where: {
      userId,
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          pricing: true,
        },
      },
    },
  });

  return items.reduce((acc, item) => acc + item.product.pricing, 0);
}
