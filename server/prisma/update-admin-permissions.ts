import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Update the existing admin user with full permissions
  const updatedAdmin = await prisma.users.update({
    where: { email: 'admin@gmail.com' },
    data: {
      permissions: {
        manageUsers: true,
        manageProducts: true,
        manageOrders: true,
        viewAnalytics: true,
        manageAdmins: true,
      },
    },
  });

  console.log('✅ Admin permissions updated successfully!');
  console.log('👤 Updated admin:', updatedAdmin);
}

main()
  .catch((e) => {
    console.error('❌ Error updating admin permissions:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

