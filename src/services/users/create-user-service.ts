import { UserRepository } from "../../repositores/user/user-repository";
import { CreateUserDto } from "../../schema/user/user-schema";
import { createHash } from "../../utils/hash";

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password, name, lastName }: CreateUserDto) {
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }
    const hashedPassword = (await createHash(password)) as string;

    await this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      lastName,
    });

    return {
      success: true,
      message: "Usuário criado com sucesso!",
    };
  }
}
