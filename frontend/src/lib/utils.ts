import { Card, CardRarity, Prisma } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { prisma } from "../../lib/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function zeroPad(num: number, places: number) {
  const zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

const chancesCardPullTable: Record<Exclude<CardRarity, "Promo">, number[]> = {
  OneDiamond: [1, 0, 0],
  TwoDiamond: [0, 0.9, 0.6],
  ThreeDiamond: [0, 0.05, 0.2],
  FourDiamond: [0, 0.01666, 0.06664],
  OneStar: [0, 0.02572, 0.10288],
  TwoStar: [0, 0.005, 0.02],
  ThreeStar: [0, 0.00222, 0.00888],
  Crown: [0, 0.0004, 0.0016],
  ShinyOne: [0, 0.00714, 0.02857],
  ShinyTwo: [0, 0.00333, 0.01333],
};

export enum CardPullPosition {
  firstThirdPullChance = "firstThirdPullChance",
  fourthPullChance = "fourthPullChance",
  fifthPullChance = "fifthPullChance",
}

export type CardPullPositionType = keyof typeof CardPullPosition;

export function getRarityTableRow(rarity: CardRarity): null | number[] {
  if (rarity in chancesCardPullTable) {
    // @ts-expect-error error not expected, this is how js works
    return chancesCardPullTable[rarity];
  }
  return null;
}

export function getTableIndexPosition(position: CardPullPositionType) {
  switch (position) {
    case "firstThirdPullChance":
      return 0;
    case "fourthPullChance":
      return 1;
    case "fifthPullChance":
      return 2;

    default:
      return null;
  }
}

export function getCardPullChance(
  rarity: CardRarity,
  position: CardPullPositionType,
) {
  const chanceTableRow = getRarityTableRow(rarity);
  const chanceTableColumnPositon = getTableIndexPosition(position);

  if (chanceTableRow !== null && chanceTableColumnPositon !== null) {
    return chanceTableRow[chanceTableColumnPositon];
  }
  return null;
}

export async function fillCardPullChanceColumns(expansionCode?: string) {
  let cardCountByRarity = await prisma.$queryRaw<
    {
      cardBoosterId: number;
      rarity: CardRarity;
      count: number;
    }[]
  >(Prisma.sql`SELECT
                cocb."cardBoosterId",
                c.rarity,
                COUNT(1) count
              FROM
                "Card" c
              JOIN "CardOnCardBooster" cocb ON
                c.id = cocb."cardId"
              GROUP BY
                cocb."cardBoosterId",
                c.rarity`);
  cardCountByRarity = cardCountByRarity.map((r) => {
    return { ...r, count: Number(r.count) };
  });

  const cards = await prisma.card.findMany({
    include: { cardBoosters: true, cardExpasionSets: true },
    ...(expansionCode
      ? {
          where: {
            cardExpasionSets: {
              some: { cardExpasionSet: { code: expansionCode } },
            },
          },
        }
      : {}),
  });
  const cardsWithPullCardChance: Card[] = [];
  for (let index = 0; index < cards.length; index++) {
    const card = cards[index];

    const totalRarityCount = cardCountByRarity.find(
      (d) =>
        d.cardBoosterId === card.cardBoosters[0].cardBoosterId &&
        d.rarity === card.rarity,
    )?.count;

    if (totalRarityCount !== undefined) {
      const allCarPositions = Object.values(CardPullPosition);
      const allPullRatePositions: { [key: string]: number } = {};
      allCarPositions.forEach((pullPosition) => {
        const pullRate = getCardPullChance(card.rarity, pullPosition);

        if (pullRate !== null) {
          const rateAtPullPosition = pullRate * (1 / totalRarityCount);
          allPullRatePositions[pullPosition] = rateAtPullPosition;
        }
      });
      cardsWithPullCardChance.push({
        ...card,
        ...allPullRatePositions,
      });
      try {
        await prisma.card.update({
          data: {
            ...allPullRatePositions,
          },
          where: { id: card.id },
        });
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.stack);
          console.error("Failed to create content interaction:", error);
        }
        console.error("Failed to create content interaction:", error);
        throw new Error("Failed to record your interaction. Please try again.");
      }
    }
  }

  return cardsWithPullCardChance;
}

export function roundNumber(num: number, scale: number) {
  if (!("" + num).includes("e")) {
    // @ts-expect-error error not expected, this is how js works
    return +(Math.round(num + "e+" + scale) + "e-" + scale);
  } else {
    const arr = ("" + num).split("e");
    let sig = "";
    if (+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(
      // @ts-expect-error error not expected, this is how js works
      (Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale)
    );
  }
}

export const isDevEnv = process.env.NODE_ENV !== "production";
