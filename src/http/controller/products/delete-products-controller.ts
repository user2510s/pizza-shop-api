import { FastifyReply, FastifyRequest } from "fastify";
import { ProductRepositore } from "../../../repositores/product/product-repository";
import { DeleteProductService } from "../../../services/products/delete-product-service";
import { deleteProductSchema } from "../../../schema/products/products-schema";

const productRepositore = new ProductRepositore();
const deleteProductServide = new DeleteProductService(productRepositore);

export async function deleteProductController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { id } = deleteProductSchema.parse(req.params);
  const userId = req.user.id;
  try {
    const product = await deleteProductServide.execute({
      id,
      userId,
    });

    return rep.status(200).send({
      message: `produto deletado: ${product.product.name}`,
      id: product.product.id,
    });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "PRODUCT_NOT_FOUND") {
        return rep.status(404).send({
          success: false,
          message: "Produto não encontrado!",
        });
      }
    }

    if (err instanceof Error) {
      if (err.message === "PRODUCT_NOT_FOUND") {
        return rep.status(404).send({
          success: false,
          message: "USER_NOT_FOUND",
        });
      }
    }

    return rep.status(500).send({
      success: false,
      message: "Erro interno do servidor",
    });
  }
}
