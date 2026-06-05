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

const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

export function start() {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }
  app.register(fastifyJwt, { secret: jwtSecret });
  app.register(cookie, {
    secret: "my-secret", // for cookies signature
    hook: "onRequest", // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
    parseOptions: {}, // options for parsing cookies
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
  app.listen({
    port: Number(process.env.PORT),
  });
}
