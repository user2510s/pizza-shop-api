import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../../../repositores/user/user-repository";
import { EditUserService } from "../../../services/users/edit-user-service";
import { editUserSchema } from "../../../schema/user/user-schema";

const userRepository = new UserRepository();
const editUserService = new EditUserService(userRepository);

export async function editUserController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { lastName, name } = editUserSchema.parse(req.body);

  try {
    const user = await editUserService.execute({
      id: req.user.id,
      name,
      lastName,
    });
    return rep.status(200).send(user);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "INVALIDE_CREDENTIALS") {
        return rep.status(400).send({
          success: false,
          message: "Usuario invalido",
        });
      }
      if (err.message === "INVALIDE_USER") {
        return rep.status(400).send({
          success: false,
          message: "Usuario invalido",
        });
      }
    }

    return rep.status(500).send({
      success: false,
      message: "Erro interno",
    });
  }
}
