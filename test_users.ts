import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.users.findMany({
    where: { Email: 'avery@umberandash.com' }
  });
  console.log('Users found:', users.length);
  for (const u of users) {
    console.log(`User: ${u.Email}, Admin: ${u.IsAdmin}, Active: ${u.IsActive}, Pwd: ${u.Password.substring(0, 10)}...`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
