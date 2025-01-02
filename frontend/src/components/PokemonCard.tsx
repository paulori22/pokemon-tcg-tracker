import Image from "next/image";
import { ActionDispatch } from "react";
import { Action, CardsActionKind } from "@/hooks/cardsReducer";
import { CardResponse } from "@/app/api/my-collection/route";
import { zeroPad } from "@/lib/utils";
import { Button } from "./ui/button";
import { MinusCircle } from "lucide-react";

export interface PokemonCardProps {
  pokemonCard: CardResponse;
  dispatch: ActionDispatch<[action: Action]>;
}

export default function PokemonCard({
  pokemonCard,
  dispatch,
}: PokemonCardProps) {
  const isCardSelected = pokemonCard.quantity > 0;
  return (
    <div
      className={`group max-w-sm hover:cursor-pointer ${isCardSelected ? "" : "opacity-25"} rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800`}
      onClick={() =>
        dispatch({
          type: CardsActionKind.INCREASE,
          payload: pokemonCard,
        })
      }
    >
      <div className="relative flex flex-col items-center">
        <Button
          variant={"outline"}
          size={"icon"}
          className="invisible absolute left-0 top-0 z-10 size-8 rounded-2xl group-hover:visible"
          onClick={(e) => {
            e.stopPropagation();
            dispatch({
              type: CardsActionKind.DECREASE,
              payload: pokemonCard,
            });
          }}
        >
          <MinusCircle />
        </Button>
        <Image
          alt={pokemonCard.name}
          src={pokemonCard.imagePath}
          height={150}
          width={100}
        />
        <input
          type="number"
          min={0}
          value={pokemonCard.quantity}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            const value = e.target.value;
            pokemonCard.quantity = Number(value);
            dispatch({
              type: CardsActionKind.SET_QUANTITY,
              payload: pokemonCard,
            });
          }}
          className="invisible absolute bottom-0 left-0 block max-h-4 w-full max-w-14 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 group-hover:visible dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col items-center p-1">
        <p className="text-1xl mb-1 font-bold tracking-tight text-gray-900 dark:text-white">
          {pokemonCard.name}
        </p>
        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
          {pokemonCard.cardBoosters[0].cardExpasionSet.code}{" "}
          {zeroPad(pokemonCard.numberInExpasionSet, 3)}
        </p>
      </div>
    </div>
  );
}
