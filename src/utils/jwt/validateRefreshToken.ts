import { redisClient } from "../../lib/redis";

export async function validateRefreshToken(token: string) {
  const userId = await redisClient.get(`refresh:${token}`);

  if (!userId) {
    throw new Error("REFRESH_TOKEN_INVALID");
  }

  return userId;
}
