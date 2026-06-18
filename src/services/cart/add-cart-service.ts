import { CartRepository } from "../../repositores/cart/cart-repository";
import { UserRepository } from "../../repositores/user/user-repository";
import { CartUserDto } from "../../schema/cart/cart-schema";

export class AddItemCartService {
  constructor(
    private cartRepository: CartRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({ userId, productId }: CartUserDto) {
    const id = userId;
    if (!id) {
      throw new Error("USER_NOT_FOUND");
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    const verifyCart = await this.cartRepository.verifyItemCart(productId);
    if (verifyCart) {
      throw new Error("ITEM_ALREADY_EXISTS");
    }

    const verifyProduct = await this.userRepository.verifyProduct(productId);
    if (!verifyProduct) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    await this.cartRepository.createCart(productId, userId);

    const items = await this.cartRepository.getItemsCart(userId);

    const total = items.reduce((acc, item) => {
      return acc + item.product.pricing;
    }, 0);

    return {
      success: true,
      message: "Item adicionado ao carrinho!",
      total,
    };
  }
}
