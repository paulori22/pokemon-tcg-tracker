import { CardExpasionSet } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";

export type CardExpansionSetApiResponse = CardExpasionSet[];

export async function GET() {
  const cardExpansionSets = await prisma.cardExpasionSet.findMany({
    orderBy: { code: "asc" },
  });

  return Response.json(cardExpansionSets);
}
