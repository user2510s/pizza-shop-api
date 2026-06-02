import { FastifyTypedInstance } from "../../../@types/types";
import z from "zod";
import { createUserController } from "../../controller/create-user-controller";

export async function createUser(app: FastifyTypedInstance) {
  app.post(
    "/user",
    {
      schema: {
        body: z.object({
          email: z.email(),
          password: z.string(),
          name: z.string(),
          lastName: z.string(),
        }),
      },
    },
    createUserController,
  );
}
