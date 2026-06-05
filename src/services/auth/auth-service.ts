import { FastifyInstance } from "fastify";

export class AuthService {
  constructor(private app: FastifyInstance) {}

  async validateToken(token: string) {
    const decoded = this.app.jwt.verify(token) as {
      id: string;
    };

    return decoded;
  }
}
