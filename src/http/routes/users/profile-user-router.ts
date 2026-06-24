import { FastifyTypedInstance } from "../../../@types/types";
import { makeVerifyAuthMiddleware } from "../../../factories/make-verify-auth-middleware";
import { profileUserController } from "../../controller/users/profile-user-controller";

//   preHandler: verifyAuth.handle.bind(verifyAuth),

export async function profilerUser(app: FastifyTypedInstance) {
  const verifyAuth = makeVerifyAuthMiddleware(app);

  app.get(
    "/profile",
    {
      preHandler: [verifyAuth.handle.bind(verifyAuth)],
      schema: {
        tags: ["user"],
        description: "Rota para listar dados do usuario logado",
      },
    },
    profileUserController,
  );
}
