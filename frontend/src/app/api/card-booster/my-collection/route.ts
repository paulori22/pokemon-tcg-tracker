import { Prisma } from "@prisma/client";
import { prisma } from "../../../../../lib/prisma";
import QueryString from "qs";
import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

export type CardBoosterMyCollectionApiResponse =
  Prisma.CardExpasionSetGetPayload<{
    include: { cardBoosters: true };
  }>;

type ParamsType = { expansionSetCode: string };

export async function GET(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("User is not signed in.", { status: 401 });
  }

  const params = QueryString.parse(req.nextUrl.search, {
    ignoreQueryPrefix: true,
  }) as unknown as ParamsType;

  const cardExpansionSets = await prisma.cardExpasionSet.findUnique({
    include: { cardBoosters: true },
    where: { code: params.expansionSetCode },
  });

  return Response.json(cardExpansionSets);
}
