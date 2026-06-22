import { FastifyTypedInstance } from "../../../@types/types";
import { authloginController } from "../../controller/auth/auth-login-controller";
import { loginUserSchema } from "../../../schema/user/user-schema";

export async function authLogin(app: FastifyTypedInstance) {
  app.post(
    "/auth/login",
    {
      schema: {
        description: "Rota de entrar com o usuario.",
        tags: ["auth"],
        body: loginUserSchema,
      },
    },
    authloginController,
  );
}
