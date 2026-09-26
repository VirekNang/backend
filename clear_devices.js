const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.device.deleteMany()
  .then(() => console.log('Deleted all devices'))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
