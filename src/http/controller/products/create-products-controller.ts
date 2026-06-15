import { FastifyReply, FastifyRequest } from "fastify";
import { createProductsSchema } from "../../../schema/products/products-schema";
import { ProductRepositore } from "../../../repositores/product/product-repository";
import { CreateProductService } from "../../../services/products/create-product-service";

const productRepositore = new ProductRepositore();
const createProductsService = new CreateProductService(productRepositore);

export async function createProductsController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { name, description, pricing, tags } = createProductsSchema.parse(
    req.body,
  );

  try {
    const product = await createProductsService.execute({
      name,
      description,
      pricing,
      userId: req.user.id,
      tags,
    });
    return rep.status(201).send(product);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "USER_NOT_FOUND") {
        return rep.status(400).send({
          success: false,
          message: "Usuario não encontrado!",
        });
      }
      if (err.message === "USER_NOT_AUTH") {
        return rep.status(400).send({
          success: false,
          message: "Usuario não autorizado!",
        });
      }
    }
  }
}
