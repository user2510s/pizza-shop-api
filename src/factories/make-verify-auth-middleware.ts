import { AuthService } from "../services/auth/auth-service";
import { VerifyAuthMiddleware } from "../http/middlewares/auth";
import { FastifyTypedInstance } from "../@types/types";

export function makeVerifyAuthMiddleware(app: FastifyTypedInstance) {
  const authService = new AuthService(app);

  return new VerifyAuthMiddleware(authService);
}

//   const verifyAuth = makeVerifyAuthMiddleware(app);
//   preHandler: verifyAuth.handle.bind(verifyAuth),
