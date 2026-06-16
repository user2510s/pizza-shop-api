import { ProductRepositore } from "../../repositores/product/product-repository";
import { FindProductDto } from "../../schema/products/products-schema";

export class FindProductService {
  constructor(private productRepository: ProductRepositore) {}

  async execute({ id }: FindProductDto) {
    const product = await this.productRepository.findProduct(id);

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    return { product };
  }
}
