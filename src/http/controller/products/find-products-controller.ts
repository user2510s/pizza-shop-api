import { FastifyReply, FastifyRequest } from "fastify";
import { findProductSchema } from "../../../schema/products/products-schema";
import { ProductRepositore } from "../../../repositores/product/product-repository";
import { FindProductService } from "../../../services/products/find-product-service";

const productRepository = new ProductRepositore();
const findProductService = new FindProductService(productRepository);

export async function findProductController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { id } = findProductSchema.parse(req.params);

  try {
    const product = await findProductService.execute({
      id,
    });

    return rep.status(201).send(product);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "PRODUCT_NOT_FOUND") {
        return rep.status(404).send({
          success: false,
          message: "Produto não encontrado!",
        });
      }
    }
  }
}
