import { FastifyReply, FastifyRequest } from "fastify";
import { createUserSchema } from "../../schema/user/user-schema";
import { UserRepository } from "../../repositores/user/user-repository";
import { CreateUserService } from "../services/create-user-service";

const userRepository = new UserRepository();
const createUserService = new CreateUserService(userRepository);

export async function createUserController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { email, password, name, lastName } = createUserSchema.parse(req.body);

  try {
    const user = await createUserService.execute({
      email,
      lastName,
      name,
      password,
    });

    return rep.status(201).send(user);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "EMAIL_ALREADY_EXISTS") {
        return rep.status(400).send({
          success: false,
          message: "Esse email ja esta em uso!",
        });
      }
    }
    return rep.status(500).send({
      success: false,
      message: "Error interno",
    });
  }
}
