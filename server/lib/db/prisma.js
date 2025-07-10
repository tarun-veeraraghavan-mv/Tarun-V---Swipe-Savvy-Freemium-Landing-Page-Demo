// To connect to Postgres database we use Prisma as our ORM
// Has inbuilt TypeSafety and prevents SQL injection

const { PrismaClient } = require("../../generated/prisma");

const prisma = new PrismaClient();

module.exports = prisma;
