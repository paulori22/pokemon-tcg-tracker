import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import BoosterInfo from "./BoosterInfo";
import { Progress } from "../ui/progress";
import { ExpansionSetDashboardApiResponse } from "@/app/api/dashboard/route";
import { roundNumber } from "@/lib/utils";

export interface ExpansionBoosterInfoProps {
  imagePath: string;
  totalCards: number;
  ownedCards: number;
  cardBoosters: ExpansionSetDashboardApiResponse["cardBoosters"];
  higherPullChanceBoosterId: number;
}

export default function ExpansionBoosterInfo({
  imagePath,
  ownedCards,
  totalCards,
  cardBoosters,
  higherPullChanceBoosterId,
}: ExpansionBoosterInfoProps) {
  const progress = (ownedCards * 100) / totalCards;

  return (
    <Card>
      <CardHeader className="flex flex-col items-center">
        <Image alt="logo" src={imagePath} width={200} height={200} />
        <CardDescription className="flex flex-col flex-wrap items-center">
          <div>
            {ownedCards} of {totalCards} cards
          </div>
          <Progress value={progress} />
          <div>{roundNumber(progress, 2)}%</div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row flex-wrap justify-center gap-2">
        {cardBoosters.map((booster) => {
          return (
            <BoosterInfo
              key={booster.id}
              imagePath={booster.imagePath}
              ownedCards={booster.totalOwned}
              totalCards={booster.totalCards}
              newCardChance={booster.pullChanceStat.total}
              higherPullChance={booster.id === higherPullChanceBoosterId}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
