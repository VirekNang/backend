const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.deviceVerificationRequest.findMany().then(data => {
  console.log(data);
  prisma.$disconnect();
});
