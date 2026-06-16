import { ProductRepositore } from "../../repositores/product/product-repository";
import { CreateProductDto } from "../../schema/products/products-schema";

export class CreateProductService {
  constructor(private productRepository: ProductRepositore) {}

  async execute({
    userId,
    name,
    description,
    pricing,
    tags,
  }: CreateProductDto) {
    if (userId == undefined) {
      throw new Error("USER_NOT_FOUND");
    }

    const user = await this.productRepository.findById(userId);

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }
    if (user.role !== "seller") {
      throw new Error("USER_NOT_AUTH");
    }
    const data = await this.productRepository.create({
      userId,
      name,
      description,
      pricing,
      tags,
    });

    return {
      data,
    };
  }
}
