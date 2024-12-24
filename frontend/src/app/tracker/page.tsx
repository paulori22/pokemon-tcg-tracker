"use client";
import PokemonCard from "@/components/PokemonCard";
import { selectedCardsReducer } from "@/hooks/cardsReducer";
import { useReducer } from "react";

export interface PokemonCardType {
  id: string;
  name: string;
  information: string;
  imagePath: string;
  quantity: number;
}

const initalPokemonCardsState: PokemonCardType[] = [
  {
    name: "Bulbasar",
    information: "A1 001/226",
    imagePath: "/genetic-apex/A1_001_EN.webp",
  },
  {
    name: "Ivysaur",
    information: "A1 002/226",
    imagePath: "/genetic-apex/A1_002_EN.webp",
  },
  {
    name: "Bulbasar",
    information: "A1 001/226",
    imagePath: "/genetic-apex/A1_001_EN.webp",
  },
  {
    name: "Ivysaur",
    information: "A1 002/226",
    imagePath: "/genetic-apex/A1_002_EN.webp",
  },
  {
    name: "Bulbasar",
    information: "A1 001/226",
    imagePath: "/genetic-apex/A1_001_EN.webp",
  },
  {
    name: "Ivysaur",
    information: "A1 002/226",
    imagePath: "/genetic-apex/A1_002_EN.webp",
  },
  {
    name: "Bulbasar",
    information: "A1 001/226",
    imagePath: "/genetic-apex/A1_001_EN.webp",
  },
  {
    name: "Ivysaur",
    information: "A1 002/226",
    imagePath: "/genetic-apex/A1_002_EN.webp",
  },
  {
    name: "Bulbasar",
    information: "A1 001/226",
    imagePath: "/genetic-apex/A1_001_EN.webp",
  },
  {
    name: "Ivysaur",
    information: "A1 002/226",
    imagePath: "/genetic-apex/A1_002_EN.webp",
  },
  {
    name: "Bulbasar",
    information: "A1 001/226",
    imagePath: "/genetic-apex/A1_001_EN.webp",
  },
  {
    name: "Ivysaur",
    information: "A1 002/226",
    imagePath: "/genetic-apex/A1_002_EN.webp",
  },
].map((c, index) => {
  return { ...c, id: String(index), quantity: 0 };
});

export default function Home() {
  const [cards, dispatch] = useReducer(
    selectedCardsReducer,
    initalPokemonCardsState
  );

  const handleSubmit = () => {
    const submitData = cards.filter((c) => c.quantity > 0);
    console.log({ cards, submitData });
    //call api to save data
  };

  return (
    <div
      className="
        grid grid-rows-[20px_1fr_20px] items-center justify-items-center 
        min-h-screen
        p-4
        gap-4
        font-[family-name:var(--font-geist-sans)]"
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>Filter</div>
        <div className="flex gap-2 items-center flex-wrap flex-row">
          {cards.map((pokemonCard) => {
            return (
              <PokemonCard
                key={pokemonCard.id}
                dispatch={dispatch}
                pokemonCard={pokemonCard}
              />
            );
          })}
        </div>
        <div className="flex flex-row gap-2 fixed bottom-4 right-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">
            Reset
          </button>
        </div>
      </main>
    </div>
  );
}
