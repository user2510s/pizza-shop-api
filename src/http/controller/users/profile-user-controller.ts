import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../../../repositores/user/user-repository";
import { ProfileUserService } from "../../../services/users/profile-user-service";

const userRepository = new UserRepository();
const userService = new ProfileUserService(userRepository);

export async function profileUser(req: FastifyRequest, rep: FastifyReply) {
  try {
    const user = await userService.execute({
      id: req.user.id,
    });

    return rep.status(200).send(user);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "USER_NOT_FOUND") {
        return rep.status(400).send({
          success: false,
          message: "usuario não encontrado",
        });
      }
    }
    return rep.status(500).send({
      success: false,
      message: "Error interno",
    });
  }
}
