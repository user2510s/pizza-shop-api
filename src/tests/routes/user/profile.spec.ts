import { beforeAll, afterAll, describe, expect, it } from "vitest";
import { buildApp } from "../../../serve";

describe("GET /profile", () => {
  let app: Awaited<ReturnType<typeof buildApp>>;
  let cookies: string[];

  beforeAll(async () => {
    app = await buildApp();

    const loginResponse = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "user@example.com",
        password: "string",
      },
    });

    cookies = loginResponse.cookies.map(
      (cookie) => `${cookie.name}=${cookie.value}`,
    );

    console.log(cookies);
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve retornar os dados do usuário autenticado", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/profile",
      headers: {
        cookie: cookies.join("; "),
      },
    });

    expect(response.statusCode).toBe(200);
  });

  it("deve retornar 401 sem token", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/profile",
    });

    expect(response.statusCode).toBe(401);
  });
});
