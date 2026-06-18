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
import { loginUser } from "./http/routes/users/login-user-router";
import { profilerUser } from "./http/routes/users/profile-user-router";
import { createProduct } from "./http/routes/products/create-products-router";
import { createRestaurant } from "./http/routes/restaurants/create-restaurant-router";
import { addItemCart } from "./http/routes/carts/item-cart-router";
import { findProducts } from "./http/routes/products/find-product-router";
import { deleteProduct } from "./http/routes/products/delete-products-router";
import { editUser } from "./http/routes/users/edit-user-router";
import { deleteItemCart } from "./http/routes/carts/delete-cart-router";

const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

export function start() {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }
  app.register(fastifyJwt, { secret: jwtSecret });
  app.register(cookie, {
    secret: "my-secret",
    hook: "onRequest",
    parseOptions: {},
  });
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fastifyCors, {
    origin: "http://localhost:5173",
    credentials: true,
  });
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "pizza-shop",
        version: "1.0.0",
      },
      components: {},
    },
    transform: jsonSchemaTransform,
  });

  app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });

  app.register(createUser);
  app.register(loginUser);
  app.register(profilerUser);
  app.register(createProduct);
  app.register(createRestaurant);
  app.register(addItemCart);
  app.register(deleteItemCart);
  app.register(findProducts);
  app.register(deleteProduct);
  app.register(editUser);

  app.listen({
    port: Number(process.env.PORT),
  });
}
