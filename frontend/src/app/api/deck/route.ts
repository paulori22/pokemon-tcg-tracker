import { DeckFormType } from "@/app/deck/new/page";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "../../../../lib/prisma";
import { countBy, map, round } from "lodash";
import { Prisma } from "@prisma/client";

export type DeckResponse = Prisma.DeckGetPayload<{
  include: {
    cards: {
      include: {
        card: {
          include: { cardBoosters: true; cardExpasionSets: true };
        };
      };
    };
  };
}> & { rateAverage: number | null; rateCount: number | null };

export async function GET() {
  const publicDecks = await prisma.deck.findMany({
    include: {
      cards: {
        include: {
          card: {
            include: {
              cardBoosters: true,
              cardExpasionSets: { include: { cardExpasionSet: true } },
            },
          },
        },
      },
    },
    where: { visibility: "Public" },
  });

  const rateStatisticPublicDecks = await prisma.deckOnRates.groupBy({
    by: ["deckId"],
    _avg: { rate: true },
    _count: { rate: true },
    where: { deck: { visibility: "Public" } },
  });

  return Response.json(
    publicDecks.map((deck) => {
      const statistic = rateStatisticPublicDecks.find(
        (row) => row.deckId === deck.id,
      );
      return {
        ...deck,
        rateAverage: statistic
          ? statistic._avg.rate
            ? round(statistic._avg.rate, 2)
            : null
          : null,
        rateCount: statistic ? statistic._count.rate : null,
      };
    }),
  );
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("User is not signed in.", { status: 401 });
  }

  const { cards, ...deckData } = (await req.json()) as DeckFormType;

  try {
    const createdDeck = await prisma.$transaction(async (tx) => {
      const deck = await tx.deck.create({ data: { ...deckData, userId } });
      const countDeckCards = countBy(cards);
      const deckOnCardsData = map(countDeckCards, (value, index) => {
        return {
          deckId: deck.id,
          cardId: index,
          quantity: value,
        };
      });
      console.log({ deck, deckOnCardsData });
      await tx.deckOnCards.createMany({ data: deckOnCardsData });

      return deck;
    });
    return Response.json(createdDeck);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
      console.error("Failed to create content interaction:", error);
    }
    console.error("Failed to create content interaction:", error);
    throw new Error("Failed to record your interaction. Please try again.");
  }
}
