import Image from "next/image";
import { MinusCircleIcon } from "@heroicons/react/24/solid";
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
      className={`group max-w-sm hover:cursor-pointer
         ${isCardSelected ? "" : "opacity-25"}
        bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
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
          className="z-10 absolute top-0 left-0 invisible group-hover:visible rounded-2xl size-8"
          onClick={(e) => {
            e.stopPropagation();
            dispatch({
              type: CardsActionKind.DECREASE,
              payload: pokemonCard,
            });
          }}
        >
          {/* <MinusCircleIcon /> */}
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
          className="
            max-w-14
            max-h-4
            absolute bottom-0 left-0 invisible group-hover:visible
          bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-lg focus:ring-blue-500
          focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
          dark:focus:ring-blue-500 dark:focus:border-blue-500
           "
        />
      </div>
      <div className="p-1 flex flex-col items-center">
        <p className="mb-1 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
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
