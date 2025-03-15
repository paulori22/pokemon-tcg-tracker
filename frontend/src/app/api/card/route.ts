import { Card, Prisma, UsersOnCards } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import QueryString from "qs";

export type CardDeckResponse = Prisma.CardGetPayload<{
  select: {
    id: true;
    name: true;
    rarity: true;
    type: true;
    imagePath: true;
    cardExpasionSets: {
      select: {
        numberInExpasionSet: true;
        cardExpasionSet: true;
      };
    };
    cardBoosters: {
      select: {
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
  };
}>;

export type CardDeckApiResponse = CardDeckResponse[];

type ParamsType = { expansionSetCode: string };

export async function GET(req: NextRequest) {
  const params = QueryString.parse(req.nextUrl.search, {
    ignoreQueryPrefix: true,
  }) as unknown as ParamsType;

  const cards = await prisma.card.findMany({
    select: {
      id: true,
      name: true,
      rarity: true,
      type: true,
      imagePath: true,
      cardExpasionSets: {
        select: {
          numberInExpasionSet: true,
          cardExpasionSet: true,
        },
      },
      cardBoosters: {
        select: {
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
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return Response.json(cards);
}
