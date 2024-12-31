import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export interface BoosterInfoProps {
  imagePath: string;
  totalCards: number;
  ownedCards: number;
  newCardChance?: number;
}

export default function BoosterInfo({
  imagePath,
  ownedCards,
  totalCards,
  newCardChance,
}: BoosterInfoProps) {
  const progress = (ownedCards * 100) / totalCards;
  return (
    <div className="flex flex-col flex-wrap gap-2 items-center">
      <Image alt="logo" src={imagePath} width={200} height={200} />
      <div>
        {ownedCards} of {totalCards} cards
      </div>
      <Progress value={progress} />
      <div>{progress.toFixed(2)}%</div>
      {newCardChance && <div>New card chance: {newCardChance}%</div>}
    </div>
  );
}
