import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../../services/auth/auth-service";

export class VerifyAuthMiddleware {
  constructor(private authService: AuthService) {}

  async handle(req: FastifyRequest, rep: FastifyReply) {
    const token = req.cookies["access_token"];

    if (!token) {
      return rep.status(401).send({
        message: "Token inválido",
      });
    }

    try {
      const user = await this.authService.validateToken(token);

      req.user = user;
    } catch {
      return rep.status(401).send({
        message: "Token inválido",
      });
    }
  }
}
