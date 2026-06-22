import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../../../repositores/user/user-repository";
import { ProfileUserService } from "../../../services/users/profile-user-service";
import { response } from "../../../constant/responses-user";

const userRepository = new UserRepository();
const userService = new ProfileUserService(userRepository);

export async function profileUser(req: FastifyRequest, rep: FastifyReply) {
  try {
    await userService.execute({
      id: req.user.id,
    });

    return rep
      .status(response.user.found.status)
      .send(response.user.found.response);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "USER_NOT_FOUND") {
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
