import { FastifyReply, FastifyRequest } from "fastify";
import { removeCartSchema } from "../../../schema/cart/cart-schema";
import { RemoveItemCartService } from "../../../services/cart/delete-cart-service";
import { CartRepository } from "../../../repositores/cart/cart-repository";

const cartRepository = new CartRepository();
const removeCartService = new RemoveItemCartService(cartRepository);

export async function removeCartController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { productId } = removeCartSchema.parse(req.params);

  try {
    const product = await removeCartService.execute({
      userId: req.user.id,
      productId,
    });

    return rep.status(200).send({
      success: true,
      message: "item deletado com sucesso",
      product,
    });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message == "USER_NOT_FOUND") {
        return rep.status(404).send({
          success: false,
          message: "usuario não encontrado",
        });
      }
      if (err.message == "ITEM_NOT_FOUND") {
        return rep.status(404).send({
          success: false,
          message: "produto não encontrado",
        });
      }
    }
  }
}
