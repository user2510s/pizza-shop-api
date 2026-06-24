import { FastifyReply, FastifyRequest } from "fastify";
import { redisClient } from "../../../lib/redis";
import { generateRefreshToken } from "../../../utils/jwt/generate-refresh-token";
import { validateRefreshToken } from "../../../utils/jwt/validateRefreshToken";

export async function refreshController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return rep.status(401).send({
        success: false,
        message: "Refresh token não encontrado",
      });
    }

    const userId = await validateRefreshToken(refreshToken);

    // Remove o token antigo
    await redisClient.del(`refresh:${refreshToken}`);
    await redisClient.del(`user:${userId}:refresh`);

    // Gera novos tokens
    const newRefreshToken = await generateRefreshToken(userId);

    const accessToken = req.server.jwt.sign(
      { id: userId },
      { expiresIn: "60s" },
    );

    const isProd = process.env.NODE_ENV === "production";

    rep.setCookie("access_token", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 60 * 62,
      path: "/",
      domain: isProd ? "" : "localhost",
    });

    rep.setCookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 60 * 62,
      path: "/",
    });

    return rep.send({
      success: true,
    });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "REFRESH_TOKEN_INVALID") {
        return rep.status(401).send({
          success: false,
          message: "Não autorizado",
        });
      }
    }
    req.log.error(err);
    return rep.status(500).send({
      success: false,
      message: "Erro interno",
    });
  }
}
