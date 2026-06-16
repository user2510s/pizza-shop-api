import { UserRepository } from "../../repositores/user/user-repository";
import { EditUserDto } from "../../schema/user/user-schema";

export class EditUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ id, lastName, name }: EditUserDto) {
    if (!id) {
      throw new Error("INVALIDE_CREDENTIALS");
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("INVALIDE_USER");
    }

    const editUser = await this.userRepository.edit({
      id,
      name,
      lastName,
    });

    return {
      success: true,
      message: "usuario editado com sucesso.",
      editUser,
    };
  }
}
