import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../../../repositores/user/user-repository";
import { LoginUserService } from "../../../services/users/login-user-service";
import { loginUserSchema } from "../../../schema/user/user-schema";

const userRepositore = new UserRepository();
const userService = new LoginUserService(userRepositore);

export async function loginUserController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { email, password } = loginUserSchema.parse(req.body);

  try {
    const user = await userService.execute({
      email,
      password,
    });

    const token = req.server.jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      {
        expiresIn: "1h",
      },
    );

    const isProd = process.env.NODE_ENV === "production";

    rep.cookie("user_login", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 60 * 60,
      path: "/",
      domain: isProd ? "" : "localhost",
    });

    return rep.status(200).send({
      success: true,  
      message: "Usuario encontrado",
    });
  } catch (err) {}
}
