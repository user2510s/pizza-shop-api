import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../../../repositores/user/user-repository";
import { EditUserService } from "../../../services/users/edit-user-service";
import { editUserSchema } from "../../../schema/user/user-schema";
import { response } from "../../../constant/responses-user";

const userRepository = new UserRepository();
const editUserService = new EditUserService(userRepository);

export async function editUserController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { lastName, name } = editUserSchema.parse(req.body);

  try {
    await editUserService.execute({
      id: req.user.id,
      name,
      lastName,
    });
    return rep
      .status(response.user.updated.status)
      .send(response.user.updated.response);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "INVALIDE_CREDENTIALS") {
        return rep
          .status(response.user.unauthorized.status)
          .send(response.user.unauthorized.response);
      }
      if (err.message === "INVALIDE_USER") {
        return rep
          .status(response.user.unauthorized.status)
          .send(response.user.unauthorized.response);
      }
    }
    return rep
      .status(response.user.internalError.status)
      .send(response.user.internalError.response);
  }
}
