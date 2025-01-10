import { Progress } from "@/components/ui/progress";
import { roundNumber } from "@/lib/utils";
import Image from "next/image";

export interface BoosterInfoProps {
  imagePath: string;
  totalCards: number;
  ownedCards: number;
  newCardChance?: number;
  higherPullChance?: boolean;
}

export default function BoosterInfo({
  imagePath,
  ownedCards,
  totalCards,
  newCardChance,
  higherPullChance,
}: BoosterInfoProps) {
  const progress = (ownedCards * 100) / totalCards;
  const highlightStyle = "rounded-xl border-2 border-green-300 p-1";
  return (
    <div className="flex flex-col flex-wrap items-center gap-2">
      <Image alt="logo" src={imagePath} width={200} height={200} />
      <div>
        {ownedCards} of {totalCards} cards
      </div>
      <Progress value={progress} />
      <div>{roundNumber(progress, 2)}%</div>
      {newCardChance ? (
        <div className={`${higherPullChance ? highlightStyle : ""} text-lg`}>
          New card chance: {roundNumber(newCardChance * 100, 2)}%
        </div>
      ) : null}
    </div>
  );
}
