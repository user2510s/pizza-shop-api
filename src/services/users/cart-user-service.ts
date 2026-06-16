import { UserRepository } from "../../repositores/user/user-repository";
import { CartUserDto } from "../../schema/user/user-schema";

export class CartUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId, productId }: CartUserDto) {
    const id = userId;
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    const verifyCart = await this.userRepository.verifyItemCard(productId);
    if (verifyCart) {
      throw new Error("ITEM_ALREADY_EXISTS");
    }

    const verifyProduct = await this.userRepository.verifyProduct(productId);
    if (!verifyProduct) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    await this.userRepository.createCart(productId, userId);

    const items = await this.userRepository.getItemsCart(userId);

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
