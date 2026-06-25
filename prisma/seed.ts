import { PreorderCreateInput } from "@/src/generated/prisma/models";
import prisma from "../src/lib/prisma";
import { PreorderWhen } from "@/src/generated/prisma/enums";

async function main() {
  // Create 20 preorders
  const data: PreorderCreateInput[] = [
    {
      name: "With Ends",
      products: 1,
      preorderWhen: PreorderWhen.REGARDLESS_OF_STOCK,
      startsAt: new Date("Aug 14, 2025, 03:59 PM"),
      createdAt: new Date("Aug 14, 2025, 03:00 PM"),
    },
    {
      name: "Partial Payment",
      products: 1,
      preorderWhen: PreorderWhen.REGARDLESS_OF_STOCK,
      startsAt: new Date("Aug 17, 2025, 04:56 PM"),
      createdAt: new Date("Aug 17, 2025, 04:00 PM"),
    },
    {
      name: "Shipping not sure",
      products: 1,
      preorderWhen: PreorderWhen.REGARDLESS_OF_STOCK,
      startsAt: new Date("Aug 17, 2025, 04:56 PM"),
      createdAt: new Date("Aug 17, 2025, 04:00 PM"),
    },
    {
      name: "Full payment",
      products: 1,
      preorderWhen: PreorderWhen.REGARDLESS_OF_STOCK,
      startsAt: new Date("Aug 17, 2025, 04:56 PM"),
      createdAt: new Date("Aug 17, 2025, 04:00 PM"),
    },
    {
      name: "Coming soon",
      products: 1,
      preorderWhen: PreorderWhen.REGARDLESS_OF_STOCK,
      startsAt: new Date("Dec 11, 2025, 04:42 PM"),
      createdAt: new Date("Dec 11, 2025, 04:00 PM"),
    },
    {
      name: "Multi variants 1",
      products: 1,
      preorderWhen: PreorderWhen.REGARDLESS_OF_STOCK,
      startsAt: new Date("Dec 15, 2025, 08:24 PM"),
      createdAt: new Date("Dec 15, 2025, 08:00 PM"),
    },
    {
      name: "Multi variant 2",
      products: 1,
      preorderWhen: PreorderWhen.REGARDLESS_OF_STOCK,
      startsAt: new Date("Dec 15, 2025, 08:24 PM"),
      endsAt: new Date("Dec 15, 2025, 08:27 PM"),
      createdAt: new Date("Dec 15, 2025, 08:00 PM"),
    },
    {
      name: "Multi variant 3",
      products: 1,
      preorderWhen: PreorderWhen.OUT_OF_STOCK,
      startsAt: new Date("Dec 15, 2025, 08:24 PM"),
      createdAt: new Date("Dec 15, 2025, 08:00 PM"),
      isActive: false,
    },
    ...Array.from({ length: 12 }, (_, index) => ({
      name: `Multi variant ${index + 4}`,
      products: 1,
      preorderWhen: PreorderWhen.REGARDLESS_OF_STOCK,
      startsAt: new Date("Dec 15, 2025, 08:24 PM"),
      createdAt: new Date("Dec 15, 2025, 08:00 PM"),
    })),
  ];

  // Filter our the existing/seeded preorders
  const existingPreorders = await prisma.preorder.findMany({
    where: {
      name: {
        in: data.map((preorder) => preorder.name),
      },
    },
    select: {
      name: true,
    },
  });

  const existingNames = new Set(
    existingPreorders.map((preorder) => preorder.name),
  );

  const newPreorders = data.filter(
    (preorder) => !existingNames.has(preorder.name),
  );

  await prisma.preorder.createMany({
    data: newPreorders,
  });

  console.log(`[Prisma Seed] Created ${newPreorders.length} new preorders`);

  if (existingNames.size > 0) {
    console.log(
      `[Prisma Seed] Skipped ${existingNames.size} existing preorders`,
    );
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("[Prisma Seed] Error:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
