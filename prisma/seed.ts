import { PrismaClient } from '@prisma/client';
import { countries } from './countries';

const prisma = new PrismaClient();

async function main() {
  for await (const data of countries) {
    const country = await prisma.country.upsert({
      where: { country: data.country },
      create: {
        country: data.country,
        population: data.population,
      },
      update: {},
    });
    console.log(country);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
