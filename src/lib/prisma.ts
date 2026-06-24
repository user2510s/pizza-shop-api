import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter, log: ["query"] });

prisma.$on("query", (e) => {
  console.log(`Tempo da query: ${e.duration} ms`);
});

export { prisma };
