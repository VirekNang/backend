require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const jwt = require('jsonwebtoken');
const axios = require('axios');

async function main() {
  const prisma = new PrismaClient({ adapter: new PrismaMariaDb(process.env.DATABASE_URL) });
  await prisma.$connect();
  
  const SessionID = require('crypto').randomUUID();
  const token = jwt.sign(
    { UserID: 1, Email: 'avery@umberandash.com1', UserType: 'admin', SessionID },
    process.env.JWT_SECRET || 'default_secret'
  );
  
  await prisma.loginSession.create({
    data: {
      SessionID,
      UserID: 1,
      UserType: 'admin',
      ExpiresAt: new Date(Date.now() + 1000000)
    }
  });
  
  try {
    const res = await axios.get('http://localhost:3000/admin/devices/pending', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("RESPONSE DATA:", res.data);
  } catch (err) {
    console.error("AXIOS ERROR:", err.response ? err.response.data : err.message);
  }
  
  await prisma.$disconnect();
}
main().catch(console.error);
