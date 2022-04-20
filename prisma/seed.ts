import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash('alezinho', 8);
  const user = await prisma.users.upsert({
    where: { email: 'alexandre.silva@email.com' },
    update: {},
    create: {
      email: 'alexandre.silva@email.com',
      name: 'Alexandre',
      password: hashedPassword,
    },
  });

  const userId = user.id;
  const bankroll = await prisma.bankrolls.create({
    data: {
      name: 'Banca do alezinho',
      userId,
    },
  });

  console.log(user, bankroll);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
