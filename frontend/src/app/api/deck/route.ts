import { DeckFormType } from "@/app/deck/new/page";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "../../../../lib/prisma";
import { countBy, map } from "lodash";

export async function POST(req: Request) {
  /*   const { userId } = await auth();

  if (!userId) {
    return new Response("User is not signed in.", { status: 401 });
  } */
  const userId = "Test";

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
