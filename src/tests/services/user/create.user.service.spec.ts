import { describe, expect, test, vi } from "vitest";
import { CreateUserService } from "../../../services/users/create-user-service";

describe("User Service", () => {
  test("Deve ser possível criar um usuário", async () => {
    const userRepository = {
      findByEmail: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({
        id: "1",
        email: "teste@gmail.com",
        name: "teste",
        lastName: "teste",
      }),
    };

    const createService = new CreateUserService(userRepository as any);

    const result = await createService.execute({
      email: "teste@gmail.com",
      name: "teste",
      lastName: "teste",
      password: "123456",
    });

    expect(userRepository.findByEmail).toHaveBeenCalledWith("teste@gmail.com");
    expect(userRepository.create).toHaveBeenCalled();
    expect(result).toHaveProperty("success", true);
  });
});
