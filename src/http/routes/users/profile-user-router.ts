import { FastifyTypedInstance } from "../../../@types/types";
import { makeVerifyAuthMiddleware } from "../../../factories/make-verify-auth-middleware";
import { profileUser } from "../../controller/users/profile-user-controller";

//   preHandler: verifyAuth.handle.bind(verifyAuth),

export async function profilerUser(app: FastifyTypedInstance) {
  const verifyAuth = makeVerifyAuthMiddleware(app);

  app.get(
    "/user",
    {
      preHandler: [verifyAuth.handle.bind(verifyAuth)],
      schema: {
        tags: ["user"],
      },
    },
    profileUser,
  );
}
