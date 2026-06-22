import { FastifyTypedInstance } from "../../../@types/types";
import { loginUserSchema } from "../../../schema/user/user-schema";
import { refreshController } from "../../controller/auth/auth-refresh-controller";

export async function authRefresh(app: FastifyTypedInstance) {
  app.post(
    "/auth/refresh",
    {
      schema: {
        description: "Rota de entrar com o usuario.",
        tags: ["auth"],
      },
    },
    refreshController,
  );
}
