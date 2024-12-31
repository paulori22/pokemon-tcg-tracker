import { CardExpasionSet } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";

export type CardExpansionSetApiResponse = CardExpasionSet[];

export async function GET() {
  const cardExpansionSets = await prisma.cardExpasionSet.findMany();

  return Response.json(cardExpansionSets);
}
