import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../../../repositores/user/user-repository";
import { loginUserSchema } from "../../../schema/user/user-schema";
import { AuthLoginService } from "../../../services/auth/auth-login-service";
import { generateRefreshToken } from "../../../utils/jwt/generate-refresh-token";

const userRepositore = new UserRepository();
const authService = new AuthLoginService(userRepositore);

export async function authloginController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { email, password } = loginUserSchema.parse(req.body);

  try {
    const user = await authService.execute({
      email,
      password,
    });

    const access_token = req.server.jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      {
        expiresIn: "60s",
      },
    );

    const refreshtoken = await generateRefreshToken(user.id);

    const isProd = process.env.NODE_ENV === "production";

    rep.cookie("access_token", access_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 60,
      path: "/",
      domain: isProd ? "" : "localhost",
    });

    rep.setCookie("refresh_token", refreshtoken, {
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
      //refreshtoken,
    });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "INVALIDE_CREDENTIALS") {
        return rep.status(404).send({
          success: false,
          message: "Não foi possivel fazer login",
        });
      }
    }
    return rep.status(500).send({
      success: false,
      message: "Não foi possivel fazer login",
    });
  }
}
