import { redisClient } from "../../lib/redis";
import { v4 as uuidv4 } from "uuid";

export async function generateRefreshToken(userId: string) {
  const token = uuidv4();

  const oldToken = await redisClient.get(`user:${userId}:refresh`);

  // Remove o token antigo
  if (oldToken) {
    await redisClient.del(`refresh:${oldToken}`);
  }

  // Salva o novo token
  await redisClient.set(`refresh:${token}`, userId, {
    EX: 60 * 63,
  });

  // Salva qual é o token atual do usuário
  await redisClient.set(`user:${userId}:refresh`, token, {
    EX: 60 * 63,
  });

  return token;
}
