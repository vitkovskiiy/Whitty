const prisma = require("../config/prisma.database");

async function main() {
  console.log("🌱 Seed countries will start soon...");

  const countries = [
    { name: "Ukraine" },
    { name: "United States" },
    { name: "United Kingdom" },
    { name: "Poland" },
    { name: "Germany" },
  ];

  for (const country of countries) {
  await prisma.country.upsert({
    where: { 
      country_name: country.name 
    },
    update: {}, 
    create: {
      country_name:country.name,
    },
  });
}

  console.log("Countries are uploaded successfully");
}

main()
  .catch((e) => {
    console.error("❌ Error while seeding countries:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
