import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Check if admin already exists
  const existingAdmin = await prisma.users.findUnique({
    where: { email: 'admin@gmail.com' },
  });

  if (!existingAdmin) {
    // Hash the password
    const hashedPassword = await bcrypt.hash('123456789', 10);

    // Create admin user with full permissions
    const admin = await prisma.users.create({
      data: {
        email: 'admin@gmail.com',
        username: 'Admin',
        password: hashedPassword,
        role: 'admin',
        permissions: {
          manageUsers: true,
          manageProducts: true,
          manageOrders: true,
          viewAnalytics: true,
          manageAdmins: true,
        },
      },
    });

    // Admin user created successfully
  } else {
    // Admin user already exists
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

