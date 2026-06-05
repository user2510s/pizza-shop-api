import { UserRepository } from "../../repositores/user/user-repository";
import { ProfileUserDto } from "../../schema/user/user-schema";

export class ProfileUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: ProfileUserDto) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("USER_NOT_FOUND"); // se não encontrar ja encerra!
    }
    return {
      user,
    };
  }
}
