import { CartRepository } from "../../repositores/cart/cart-repository";
import { CartUserDto } from "../../schema/cart/cart-schema";

export class RemoveItemCartService {
  constructor(private cartRepository: CartRepository) {}
  async execute({ userId, productId }: CartUserDto) {
    if (!userId) {
      throw new Error("USER_NOT_FOUND");
    }

    const remove = await this.cartRepository.removeCart(productId, userId);

    if (!remove) {
      throw new Error("USER_NOT_FOUND");
    }
    if (remove.count === 0) {
      throw new Error("ITEM_NOT_FOUND");
    }

    return {
      success: true,
      message: "produto removido",
      remove,
    };
  }
}
