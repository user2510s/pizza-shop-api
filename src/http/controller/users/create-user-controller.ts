import { FastifyReply, FastifyRequest } from "fastify";
import { createUserSchema } from "../../../schema/user/user-schema";
import { UserRepository } from "../../../repositores/user/user-repository";
import { CreateUserService } from "../../../services/users/create-user-service";
import { response } from "../../../constant/responses-user";

const userRepository = new UserRepository();
const createUserService = new CreateUserService(userRepository);

export async function createUserController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { email, password, name, lastName } = createUserSchema.parse(req.body);

  try {
    await createUserService.execute({
      email,
      lastName,
      name,
      password,
    });

    return rep
      .status(response.user.created.status)
      .send(response.user.created.response);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "EMAIL_ALREADY_EXISTS") {
        return rep
          .status(response.user.alreadyExists.status)
          .send(response.user.alreadyExists.response);
      }
    }
    return rep
      .status(response.user.internalError.status)
      .send(response.user.internalError.response);
  }
}
