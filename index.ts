import { buildApp } from "./src/serve";

async function start() {
  const app = await buildApp();

  await app.listen({
    port: Number(process.env.PORT),
  });
}

start();
