import { UserRepository } from "../../repositores/user/user-repository";
import { LoginUserDto } from "../../schema/user/user-schema";
import { verifyHash } from "../../utils/hash";

export class AuthLoginService {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: LoginUserDto) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("INVALIDE_CREDENTIALS");
    }

    const isPassword = await verifyHash(password, user.password);

    if (!isPassword) {
      throw new Error("INVALIDE_CREDENTIALS");
    }

    return user;
  }
}
