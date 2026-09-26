const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.users.findFirst().then(u => {
  console.log('User:', u?.Email, u?.Password);
  prisma.$disconnect();
});
