import { string } from "zod/v3";
import { FastifyTypedInstance } from "../../../@types/types";
import z from "zod";

async function createUser(app: FastifyTypedInstance) {
  app.post(
    "/user",
    {
      schema: {
        body: z.object({
          email: z.email(),
        }),
      },
    },
    async (req, rep) => {
      const { email } = req.body;
    },
  );
}
