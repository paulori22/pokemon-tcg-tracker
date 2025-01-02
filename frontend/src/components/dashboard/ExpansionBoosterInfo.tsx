import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import BoosterInfo from "./BoosterInfo";
import { Progress } from "../ui/progress";
import { DashboardApiItemResponse } from "@/app/api/dashboard/route";

export interface ExpansionBoosterInfoProps {
  imagePath: string;
  totalCards: number;
  ownedCards: number;
  cardBoosters: DashboardApiItemResponse["cardBoosters"];
}

export default function ExpansionBoosterInfo({
  imagePath,
  ownedCards,
  totalCards,
  cardBoosters,
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
          <div>{progress.toFixed(2)}%</div>
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
              newCardChance={0}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
