import { beforeAll, afterAll, describe, expect, it } from "vitest";
import { buildApp } from "../serve";

describe("GET /hello", () => {
  let app: Awaited<ReturnType<typeof buildApp>>;

  beforeAll(async () => {
    app = await buildApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve retornar hello", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/hello",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      message: "Olá mundo",
    });
  });
});
