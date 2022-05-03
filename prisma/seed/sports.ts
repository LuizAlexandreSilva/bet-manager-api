import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const sports = [
    { name: 'Apostas Especiais' },
    { name: 'Badmington' },
    { name: 'Basquetebol' },
    { name: 'Beisebol' },
    { name: 'Bilhar' },
    { name: 'Bowls' },
    { name: 'Boxe' },
    { name: 'Cassino' },
    { name: 'Ciclismo' },
    { name: 'Corridas de cavalos' },
    { name: 'Corridas de galgos' },
    { name: 'Críquete' },
    { name: 'Current Affairs' },
    { name: 'Dardos' },
    { name: 'Desportos de Inverno' },
    { name: 'Desportos Motorizados' },
    { name: 'E-Sports' },
    { name: 'Futebol' },
    { name: 'Futebol Americano' },
    { name: 'Futebol de Areia' },
    { name: 'Futsal' },
    { name: 'Golfe' },
    { name: 'Handebol' },
    { name: 'Hóquei no Gelo' },
    { name: 'Jogos Gaélicos' },
    { name: 'Mercados Financeiros' },
    { name: 'Mixed Martial Arts' },
    { name: 'Política' },
    { name: 'Pôquer' },
    { name: 'Regras Internacionais' },
    { name: 'Rugby League' },
    { name: 'Rugby Union' },
    { name: 'Snooker' },
    { name: 'Tênis' },
    { name: 'Tênis de Mesa' },
    { name: 'Voleibol' },
    { name: 'Xadrez' },
  ];

  await prisma.categories.createMany({
    data: sports,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
