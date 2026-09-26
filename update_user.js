const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const bcrypt = require('bcrypt');
require('dotenv').config();

const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL),
});

async function main() {
  const hashed = await bcrypt.hash('123456789', 10);
  
  await prisma.users.updateMany({
    where: { Email: 'avery@umberandash.com1' },
    data: { 
      Password: hashed,
      PinCode: '444444',
      Phone: '012345678'
    }
  });

  console.log('Updated avery@umberandash.com1 password, pincode, and phone');
}

main().catch(console.error).finally(() => prisma.$disconnect());
