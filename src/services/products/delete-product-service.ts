import { ProductRepositore } from "../../repositores/product/product-repository";
import { DeleteProductDto } from "../../schema/products/products-schema";

export class DeleteProductService {
  constructor(private productRepository: ProductRepositore) {}

  async execute({ id, userId }: DeleteProductDto) {
    if (!userId) {
      throw new Error("USER_NOT_FOUND");
    }
    try {
      const product = await this.productRepository.deleteProduct(id, userId);
      return { product };
    } catch {
      throw new Error("PRODUCT_NOT_FOUND");
    }
  }
}
