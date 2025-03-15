import Image from "next/image";

import { zeroPad } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { MinusCircle } from "lucide-react";
import { CardDeckResponse } from "@/app/api/card/route";
import { memo } from "react";

export interface BasicPokemonCardProps {
  pokemonCard: CardDeckResponse;
  quantity?: number;
  onCLick?: (cardId: string) => void;
  className?: string;
}

export default memo(function BasicPokemonCard({
  pokemonCard,
  quantity,
  onCLick,
  className = "",
}: BasicPokemonCardProps) {
  return (
    <Card
      className={`group relative flex max-w-28 flex-col items-center justify-center truncate rounded-lg ${className}`}
      {...(onCLick && {
        onClick: () => {
          if (onCLick) {
            onCLick(pokemonCard.id);
          }
        },
      })}
    >
      <CardContent className="flex flex-col items-center justify-center justify-items-center p-1">
        <Image
          alt={pokemonCard.name}
          src={pokemonCard.imagePath}
          height={0}
          width={0}
          sizes="100vw"
          className="h-[142] w-[102]"
        />
        <div className="flex flex-row items-center justify-center justify-items-center gap-2">
          <div className="flex flex-col flex-wrap items-center gap-1">
            <p className="truncate text-[8px] font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl">
              {pokemonCard.name}
            </p>
            <p className="truncate text-[6px] font-normal text-gray-700 dark:text-gray-400 sm:text-xs">
              {pokemonCard.cardExpasionSets[0].cardExpasionSet.code}{" "}
              {zeroPad(pokemonCard.cardExpasionSets[0].numberInExpasionSet, 3)}
            </p>
          </div>
          {/*           <div>
            <p className="truncate text-[8px] font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl">
              x {quantity}
            </p>
          </div> */}
        </div>
      </CardContent>

      {/* <MinusCircle className="invisible absolute right-0 top-0 z-10 size-8 rounded-2xl text-red-700 group-hover:visible" /> */}
    </Card>
  );
});
