import { FastifyTypedInstance } from "../../@types/types";

export class AuthService {
  constructor(private app: FastifyTypedInstance) {}

  async validateToken(token: string) {
    const decoded = this.app.jwt.verify(token) as {
      id: string;
    };

    return decoded;
  }
}
