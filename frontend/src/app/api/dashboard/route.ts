import { prisma } from "../../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";

export type DashboardApiResponse = DashboardApiItemResponse[];

export interface DashboardApiItemResponse {
  id: number;
  code: string;
  name: string;
  totalCards: number;
  releasedAt: string;
  imagePath: string;
  totalOwned: number;
  cardBoosters: CardBoosterDashboardResponse[];
}

export interface CardBoosterDashboardResponse {
  id: number;
  cardExpasionSetId: number;
  name: string;
  releasedAt: string | null;
  imagePath: string;
  totalOwned: number;
  totalCards: number;
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return new Response("User is not signed in.", { status: 401 });
  }

  /*   const result = await prisma.$queryRaw<
    test[]
  >`SELECT * FROM "_CardToCardBooster"`;
  const rowsToInsert = [];
  for (let index = 0; index < result.length; index++) {
    const row = result[index];
    const card = await prisma.card.findFirstOrThrow({ where: { id: row.A } });
    const insertRow = {
      cardBoosterId: row.B,
      cardId: card.id,
      numberInExpasionSet: card.numberInExpasionSet,
    };
    rowsToInsert.push(insertRow);
  }
  const records = await prisma.cardOnCardBooster.createManyAndReturn({
    data: rowsToInsert,
  }); */
  /*   try {
    const result = await prisma.$queryRaw`SELECT * FROM "Card"`;
    console.log(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
      console.error("Failed to create content interaction:", error);
    }
    console.error("Failed to create content interaction:", error);
    throw new Error("Failed to record your interaction. Please try again.");
  } */

  const cardExpansionSets = await prisma.cardExpasionSet.findMany({
    include: {
      cardBoosters: {
        include: {
          _count: {
            select: {
              cards: {
                where: { card: { userCards: { some: { userId } } } },
              },
            },
          },
          cards: {
            select: {
              card: {
                select: {
                  id: true,
                  name: true,
                  rarity: true,
                },
              },
            },
            orderBy: { numberInExpasionSet: "asc" },
          },
        },
      },
    },
    orderBy: { code: "asc" },
  });

  const result = cardExpansionSets.map((cardExpansionSet) => {
    const { cardBoosters, ...rest } = cardExpansionSet;
    const newCardBooster = cardBoosters.map((cardBooster) => {
      const { _count, cards, ...restCardBooster } = cardBooster;
      return {
        ...restCardBooster,
        totalOwned: _count.cards,
        totalCards: cards.length,
      };
    });

    return {
      ...rest,
      totalOwned: newCardBooster.reduce((prevVal, currentVal) => {
        return prevVal + currentVal.totalOwned;
      }, 0),
      cardBoosters: newCardBooster,
    };
  });

  return Response.json(result);
}
