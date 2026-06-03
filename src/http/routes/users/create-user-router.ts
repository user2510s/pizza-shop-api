import { FastifyTypedInstance } from "../../../@types/types";
import { createUserController } from "../../controller/users/create-user-controller";
import { createUserSchema } from "../../../schema/user/user-schema";

export async function createUser(app: FastifyTypedInstance) {
  app.post(
    "/user",
    {
      schema: {
        description: "Criar usuario",
        tags: ["user"],
        body: createUserSchema,
      },
    },
    createUserController,
  );
}
