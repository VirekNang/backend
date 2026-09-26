const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
require('dotenv').config();
const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });
async function main() {
  await prisma.deviceVerificationRequest.deleteMany();
  await prisma.device.deleteMany();
  console.log('All devices and requests deleted successfully');
}
main().catch(console.error).finally(() => prisma.$disconnect());
