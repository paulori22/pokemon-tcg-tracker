import { prisma } from "../../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";

export interface ExpansionSetDashboardApiResponse {
  id: number;
  code: string;
  name: string;
  totalCards: number;
  releasedAt: string;
  imagePath: string;
  totalOwned: number;
  cardBoosters: CardBoosterDashboardApiResponse[];
  higherPullChanceBoosterId: number;
}

export interface CardBoosterDashboardApiResponse {
  id: number;
  cardExpasionSetId: number;
  name: string;
  releasedAt: string | null;
  imagePath: string;
  totalOwned: number;
  totalCards: number;
  pullChanceStat: {
    firstThirdPullChance: number;
    fourthPullChance: number;
    fifthPullChance: number;
    total: number;
  };
}

export interface DashboardApiResponse {
  expansionsSets: ExpansionSetDashboardApiResponse[];
  higherPullChanceBoosterId: number;
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return new Response("User is not signed in.", { status: 401 });
  }

  const cardExpansionSets = await prisma.cardExpasionSet.findMany({
    include: {
      _count: {
        select: {
          cards: {
            where: {
              card: {
                userCards: { some: { AND: [{ userId, quantity: { gt: 0 } }] } },
              },
            },
          },
        },
      },
      cardBoosters: {
        include: {
          _count: {
            select: {
              cards: {
                where: {
                  card: {
                    userCards: {
                      some: { AND: [{ userId, quantity: { gt: 0 } }] },
                    },
                  },
                },
              },
            },
          },
          cards: {
            include: {
              card: {
                include: {
                  userCards: {
                    select: { quantity: true },
                    where: { userId },
                  },
                },
              },
            },
          },
        },
      },
    },
    orderBy: { code: "asc" },
  });

  const result = cardExpansionSets.map((cardExpansionSet) => {
    const { cardBoosters, _count, ...rest } = cardExpansionSet;
    const newCardBooster = cardBoosters.map((cardBooster) => {
      const { _count, cards, ...restCardBooster } = cardBooster;
      const missingCards = cards.filter(
        (card) =>
          card.card.userCards.length === 0 ||
          card.card.userCards[0].quantity === 0,
      );

      const firstThirdPullChanceBooster = missingCards.reduce(
        (prevVal, curVal) => {
          return prevVal + (curVal.card.firstThirdPullChance ?? 0);
        },
        0,
      );
      const fourthPullChanceBooster = missingCards.reduce((prevVal, curVal) => {
        return prevVal + (curVal.card.fourthPullChance ?? 0);
      }, 0);
      const fifthPullChancePullChanceBooster = missingCards.reduce(
        (prevVal, curVal) => {
          return prevVal + (curVal.card.fifthPullChance ?? 0);
        },
        0,
      );
      return {
        ...restCardBooster,
        totalCards: cards.length,
        totalOwned: _count.cards,
        missingCards,
        cards,
        pullChanceStat: {
          firstThirdPullChance: firstThirdPullChanceBooster,
          fourthPullChance: fourthPullChanceBooster,
          fifthPullChance: fifthPullChancePullChanceBooster,
          total:
            1 -
            Math.pow(1 - firstThirdPullChanceBooster, 3) *
              (1 - fourthPullChanceBooster) *
              (1 - fifthPullChancePullChanceBooster),
        },
      };
    });

    return {
      ...rest,
      totalOwned: _count.cards,
      cardBoosters: newCardBooster,
      higherPullChanceBoosterId: newCardBooster.sort(
        (a, b) => b.pullChanceStat.total - a.pullChanceStat.total,
      )[0].id,
    };
  });

  let higherPullChanceBoosterId = null;
  let higherPullChanceBoosterValue = 0;
  for (let index = 0; index < result.length; index++) {
    const expansionSet = result[index];

    expansionSet.cardBoosters.forEach((booster) => {
      if (booster.pullChanceStat.total > higherPullChanceBoosterValue) {
        higherPullChanceBoosterId = booster.id;
        higherPullChanceBoosterValue = booster.pullChanceStat.total;
      }
    });
  }

  return Response.json({ expansionsSets: result, higherPullChanceBoosterId });
}
