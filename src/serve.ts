import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastifyCors } from "@fastify/cors";
import cookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import "dotenv/config";
import { createUser } from "./http/routes/users/create-user-router";
import { authLogin } from "./http/routes/auth/auth-login-router";
import { profilerUser } from "./http/routes/users/profile-user-router";
import { createProduct } from "./http/routes/products/create-products-router";
import { createRestaurant } from "./http/routes/restaurants/create-restaurant-router";
import { addItemCart } from "./http/routes/carts/item-cart-router";
import { findProducts } from "./http/routes/products/find-product-router";
import { deleteProduct } from "./http/routes/products/delete-products-router";
import { editUser } from "./http/routes/users/edit-user-router";
import { deleteItemCart } from "./http/routes/carts/delete-cart-router";

import { authRefresh } from "./http/routes/auth/auth-refresh-router";
import { connectRedis } from "./lib/redis";
import { deleteUser } from "./http/routes/users/delete-user-router";

export async function buildApp() {
  const app = fastify({ logger: false }).withTypeProvider<ZodTypeProvider>();
  await connectRedis();
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }
  await app.register(fastifyJwt, { secret: jwtSecret });
  await app.register(cookie, {
    secret: "my-secret",
    hook: "onRequest",
    parseOptions: {},
  });
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(fastifyCors, {
    origin: "http://localhost:5173",
    credentials: true,
  });
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "pizza-shop",
        version: "1.0.0",
      },
      components: {},
    },
    transform: jsonSchemaTransform,
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });

  app.get(
    "/hello",
    {
      schema: {
        tags: ["hello"],
        description: "verify status",
      },
    },
    async () => {
      return {
        message: "Olá mundo",
      };
    },
  );

  await app.register(createUser);
  await app.register(authLogin);
  await app.register(authRefresh);

  await app.register(profilerUser);
  await app.register(deleteUser);
  await app.register(createProduct);
  await app.register(createRestaurant);
  await app.register(addItemCart);
  await app.register(deleteItemCart);
  await app.register(findProducts);
  await app.register(deleteProduct);
  await app.register(editUser);

  await app.ready();

  return app;
}
