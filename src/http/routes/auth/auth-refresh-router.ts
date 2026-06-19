import z from "zod";
import { FastifyTypedInstance } from "../../../@types/types";

export async function authRefresh(app: FastifyTypedInstance) {
  app.post(
    "/auth/refresh",
    {
      schema: {
        description: "Rota de refresh token",
        tags: ["auth"],
        body: z.object({
          id: z.uuid(),
          email: z.email(),
        }),
      },
    },
    async () => {},
  );
}
