import z from "zod";
import { FastifyTypedInstance } from "../../../@types/types";
import { loginUserController } from "../../controller/users/login-user-controller";
import { loginUserSchema } from "../../../schema/user/user-schema";

export async function loginUser(app: FastifyTypedInstance) {
  app.post(
    "/auth/login",
    {
      schema: {
        description: "Rota de entrar com o usuario.",
        tags: ["user"],
        body: loginUserSchema,
      },
    },
    loginUserController,
  );
}
