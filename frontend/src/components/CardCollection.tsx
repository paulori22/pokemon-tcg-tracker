"use client";
import PokemonCard from "@/components/PokemonCard";
import { CardsActionKind, selectedCardsReducer } from "@/hooks/cardsReducer";
import { useEffect, useReducer } from "react";
import { CardExpansionSetApiResponse } from "../app/api/card-expansion-set/route";

const getUserCards = async (
  expansionSetCode: CardExpansionSetApiResponse[0]["code"]
) => {
  const response = await fetch(
    `/api/my-collection?expansionSetCode=${expansionSetCode}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};
export interface CardCollectionProps {
  expansionSetCode: CardExpansionSetApiResponse[0]["code"];
}
export default function CardCollection({
  expansionSetCode,
}: CardCollectionProps) {
  const [cards, dispatch] = useReducer(selectedCardsReducer, []);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserCards(expansionSetCode);
      dispatch({ type: CardsActionKind.SET_STATE, payload: data });
    }
    fetchData();
  }, [expansionSetCode]);

  const handleSubmit = async () => {
    const submitData = cards
      .filter((c) => c.quantity > 0)
      .map((c) => {
        const { id, quantity } = c;
        return { cardId: id, quantity };
      });
    console.log({ submitData });
    //call api to save data
    const response = await fetch("/api/my-collection", {
      method: "POST",
      body: JSON.stringify(submitData),
    });
    console.log(response);
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
        <div>
          <input type="text" name="search" placeholder="Search by name" />
        </div>
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
