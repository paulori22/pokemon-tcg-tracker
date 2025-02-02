import { CardExpasionSet } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";

export type CardExpansionSetApiResponse = CardExpasionSet[];

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new Response("User is not signed in.", { status: 401 });
  }

  const cardExpansionSets = await prisma.cardExpasionSet.findMany({
    orderBy: { code: "asc" },
  });

  return Response.json(cardExpansionSets);
}
