import z from "zod";
import { FastifyTypedInstance } from "../../../@types/types";
import { makeVerifyAuthMiddleware } from "../../../factories/make-verify-auth-middleware";
import { editUserSchema } from "../../../schema/user/user-schema";
import { editUserController } from "../../controller/users/edit-user-controller";

export async function editUser(app: FastifyTypedInstance) {
  const verifyAuth = makeVerifyAuthMiddleware(app);

  app.patch(
    "/user",
    {
      preHandler: [verifyAuth.handle.bind(verifyAuth)],
      schema: {
        description: "Edição de dados usuario",
        tags: ["user"],
        body: editUserSchema.omit({ id: true }),
      },
    },
    editUserController,
  );
}
