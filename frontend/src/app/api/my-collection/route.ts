import { Card, Prisma, UsersOnCards } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@/auth";
import { NextRequest } from "next/server";

export type CardResponse = Prisma.CardGetPayload<{
  select: {
    id: true;
    name: true;
    numberInExpasionSet: true;
    rarity: true;
    type: true;
    imagePath: true;
    cardBoosters: {
      select: {
        id: true;
        name: true;
        cardExpasionSet: {
          select: { id: true; code: true; name: true; totalCards: true };
        };
      };
    };
  };
}> & { quantity: number };

export type CardApiResponse = CardResponse[];

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    throw new Error("User must be logged in to use my collection");
  }
  const expansionSetCode = req.nextUrl.searchParams.get(
    "expansionSetCode"
  ) as string;

  const cards = await prisma.card.findMany({
    select: {
      id: true,
      name: true,
      numberInExpasionSet: true,
      rarity: true,
      type: true,
      imagePath: true,
      cardBoosters: {
        select: {
          id: true,
          name: true,
          cardExpasionSet: {
            select: { id: true, code: true, name: true, totalCards: true },
          },
        },
      },
      userCards: {
        select: { quantity: true },
        where: { userId: session.user?.id },
      },
    },
    where: {
      cardBoosters: {
        some: {
          cardExpasionSet: {
            code: expansionSetCode,
          },
        },
      },
    },
    orderBy: {
      numberInExpasionSet: "asc",
    },
  });
  const result = cards.map((c) => {
    const { userCards, ...rest } = c;
    const quantity = userCards[0]?.quantity ?? 0;
    return { ...rest, quantity };
  });

  return Response.json(result);
}

type CardDTO = {
  cardId: Card["id"];
  quantity: UsersOnCards["quantity"];
};

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    throw new Error("User must be logged in to use my collection");
  }
  const body = (await req.json()) as CardDTO[];
  //TODO: validate body before insert
  const data = body.map((userCard) => {
    return { ...userCard, userId: session.user?.id as string };
  });

  await prisma.$transaction(
    data.map((userCard) =>
      prisma.usersOnCards.upsert({
        where: {
          userId_cardId: { userId: userCard.userId, cardId: userCard.cardId },
        },
        update: { quantity: userCard.quantity },
        create: { ...userCard },
      })
    )
  );
  return Response.json(body);
}
