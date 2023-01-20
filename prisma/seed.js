const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { faker } = require('@faker-js/faker');

async function main() {
  await prisma.campus.createMany({
    data: [
      { city: "Lyon", adresse: "17, Rue Delandine" },
      { city: "Paris", adresse: "44, Rue Alphonse Penaud" },
      { city: "La Loupe", adresse: "18, Rue de la Gare" },
      { city: "Bordeaux", adresse: "171, Rue Lucien Faure" },
      { city: "Biarritz", adresse: "27, Rte de Pitoys" },
      { city: "Toulouse", adresse: "76, All. Jean Jaurès Bâtiment A" },
    ],
  });

  await prisma.student.createMany({
    data: Array.from({ length: 100 }).map(() => ({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      age: faker.datatype.number({ min: 18, max: 75 }),
      campId: faker.datatype.number({ min: 1, max: 6 }),
    })),
  });

  await prisma.student.createMany({
    data: Array.from({ length: 30 }).map(() => ({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      age: faker.datatype.number({ min: 18, max: 75 }),
      remote: true
    })),
  });
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
