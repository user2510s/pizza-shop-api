import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../../../repositores/user/user-repository";
import { CartUserService } from "../../../services/users/cart-user-service";
import { cartUserSchema } from "../../../schema/user/user-schema";

const userRepositore = new UserRepository();
const cartService = new CartUserService(userRepositore);

export async function cartUserController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { productId } = cartUserSchema.parse(req.body);

  try {
    const card = await cartService.execute({
      productId,
      userId: req.user.id,
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
