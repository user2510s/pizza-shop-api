import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../../../repositores/user/user-repository";
import { AddItemCartService } from "../../../services/cart/add-cart-service";
import { addCartSchema } from "../../../schema/cart/cart-schema";
import { CartRepository } from "../../../repositores/cart/cart-repository";

const userRepository = new UserRepository();
const cartRepository = new CartRepository();
const cartService = new AddItemCartService(cartRepository, userRepository);

export async function addCartController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { productId } = addCartSchema.parse(req.body);

  try {
    const card = await cartService.execute({
      userId: req.user.id,
      productId,
    });
    return rep.status(201).send(card);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "ITEM_ALREADY_EXISTS") {
        return rep.status(400).send({
          success: false,
          message: "Este item ja esta no carrinho.",
        });
      }
      if (err.message === "PRODUCT_NOT_FOUND") {
        return rep.status(404).send({
          success: false,
          message: "Produto não encontrado",
        });
      }
      if (err.message === "USER_NOT_FOUND") {
        return rep.status(404).send({
          success: false,
          message: "Usuario desconhecido!",
        });
      }
    }
    return rep.status(500).send({
      success: false,
      message: "Error interno",
    });
  }
}
