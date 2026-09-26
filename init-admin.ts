import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'avery@umberandash.com';
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if employee exists
  let employee = await prisma.employee.findFirst({ where: { EmployeeName: 'Avery Admin' } });
  
  if (!employee) {
    employee = await prisma.employee.create({
      data: {
        EmployeeNo: 'EMP-0001',
        EmployeeName: 'Avery Admin',
        Gender: 'Male',
        DateOfBirth: new Date('1990-01-01'),
        Phone: '855123456789',
        EducationStatus: 'Bachelor',
        Address: 'Phnom Penh',
        Department: 'Management',
        Position: 'Admin',
        HiredDate: new Date(),
        BaseSalary: 1000.0,
        PhotoURL: 'default.png',
        IsActive: true,
      },
    });
  }

  // Create User
  const existingUser = await prisma.users.findUnique({ where: { UserID: employee.EmployeeID } });
  if (!existingUser) {
    await prisma.users.create({
      data: {
        UserID: employee.EmployeeID,
        Username: 'avery',
        Email: email,
        Password: hashedPassword,
        Phone: '855123456789',
        Image: 'default.png',
        IsAdmin: true,
        IsActive: true,
        IsDuDate: new Date('2030-01-01'),
      },
    });
    console.log(`Successfully created admin user: ${email} / ${password}`);
  } else {
    // Update password just in case
    await prisma.users.update({
      where: { UserID: employee.EmployeeID },
      data: { Password: hashedPassword }
    });
    console.log(`Admin user already exists. Updated password to: ${password}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
