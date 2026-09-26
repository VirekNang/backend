require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

async function main() {
  const prisma = new PrismaClient({ adapter: new PrismaMariaDb(process.env.DATABASE_URL) });
  await prisma.$connect();
  const requests = await prisma.deviceVerificationRequest.findMany({ include: { User: true } });
  console.log(JSON.stringify(requests, null, 2));
  await prisma.$disconnect();
}
main().catch(console.error);
