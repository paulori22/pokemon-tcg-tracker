import { Card, Prisma, UsersOnCards } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import QueryString from "qs";
import { FilterFormType } from "@/components/my-collection/FilterForm";

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
        numberInExpasionSet: true;
        cardBooster: {
          select: {
            id: true;
            name: true;
            cardExpasionSet: {
              select: { id: true; code: true; name: true; totalCards: true };
            };
          };
        };
      };
    };
    userCards: {
      select: { quantity: true };
    };
  };
}> & { quantity: number };

export type CardApiResponse = CardResponse[];

type ParamsType = { expansionSetCode: string; filter: FilterFormType };

export async function GET(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("User is not signed in.", { status: 401 });
  }

  const params = QueryString.parse(req.nextUrl.search, {
    ignoreQueryPrefix: true,
  }) as unknown as ParamsType;

  //if filter[name] is empty in production the filter param is not defined
  const searchName = params.filter
    ? params.filter.name
      ? params.filter.name
      : ""
    : "";

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
          numberInExpasionSet: true,
          cardBooster: {
            select: {
              id: true,
              name: true,
              cardExpasionSet: {
                select: { id: true, code: true, name: true, totalCards: true },
              },
            },
          },
        },
        where: {
          cardBooster: { cardExpasionSet: { code: params.expansionSetCode } },
        },
      },
      userCards: {
        select: { quantity: true },
        where: { userId: userId },
      },
    },
    where: {
      OR: [
        { name: { contains: searchName, mode: "insensitive" } },
        { id: { contains: searchName, mode: "insensitive" } },
      ],
      cardBoosters: {
        some: {
          cardBooster: {
            cardExpasionSet: {
              cardBoosters: {
                some: { cardExpasionSet: { code: params.expansionSetCode } },
              },
            },
          },
        },
      },
    },
  });

  const result = cards.map((c) => {
    const { userCards, ...rest } = c;
    const quantity = userCards[0]?.quantity ?? 0;
    return { ...rest, quantity };
  });

  const orderedByResult = result.sort((a, b) => {
    return (
      a.cardBoosters[0].numberInExpasionSet -
      b.cardBoosters[0].numberInExpasionSet
    );
  });

  return Response.json(orderedByResult);
}

type CardDTO = {
  cardId: Card["id"];
  quantity: UsersOnCards["quantity"];
};

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("User is not signed in.", { status: 401 });
  }

  const body = (await req.json()) as CardDTO[];
  //TODO: validate body before insert
  const data = body.map((userCard) => {
    return { ...userCard, userId };
  });

  await prisma.$transaction(
    data.map((userCard) =>
      prisma.usersOnCards.upsert({
        where: {
          userId_cardId: { userId: userCard.userId, cardId: userCard.cardId },
        },
        update: { quantity: userCard.quantity },
        create: { ...userCard },
      }),
    ),
  );
  return Response.json(body);
}
