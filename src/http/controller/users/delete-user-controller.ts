import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../../../repositores/user/user-repository";
import { response } from "../../../constant/responses-user";
import { DeleteUserService } from "../../../services/users/delete-user-service";
import { deleteUserSchema } from "../../../schema/user/user-schema";
const userRepository = new UserRepository();
const userService = new DeleteUserService(userRepository);

export async function deleteUserController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { email } = deleteUserSchema.omit({ id: true }).parse(req.body);

  if (!req.user) {
    return rep.status(401).send({
      success: false,
      message: "Não autenticado",
    });
  }

  try {
    const user = await userService.execute({
      id: req.user.id,
      email,
    });

    return rep.status(response.user.found.status).send(user);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "USER_NOT_FOUND") {
        return rep
          .status(response.user.unauthorized.status)
          .send(response.user.unauthorized.response);
      }
    }
    return rep.status(response.user.internalError.status).send(err);
  }
}
