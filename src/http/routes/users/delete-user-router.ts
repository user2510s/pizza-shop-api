import z from "zod";
import { FastifyTypedInstance } from "../../../@types/types";
import { deleteUserController } from "../../controller/users/delete-user-controller";
import { makeVerifyAuthMiddleware } from "../../../factories/make-verify-auth-middleware";
import { editUserSchema } from "../../../schema/user/user-schema";

export async function deleteUser(app: FastifyTypedInstance) {
  const verifyAuth = makeVerifyAuthMiddleware(app);

  app.delete(
    "/user",

    {
      preHandler: [verifyAuth.handle.bind(verifyAuth)],
      schema: {
        description: "Deletar Usuario",
        tags: ["user"],
        body: editUserSchema.omit({ id: true }),
      },
    },
    deleteUserController,
  );
}
