import { UserRepository } from "../../repositores/user/user-repository";
import { DeleteUserDto } from "../../schema/user/user-schema";

export class DeleteUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ id, email }: DeleteUserDto) {
    const user = await this.userRepository.deleteUser({ id, email });
    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    return {
      success: true,
      message: "Usuario deletado com sucesso",
    };
  }
}
