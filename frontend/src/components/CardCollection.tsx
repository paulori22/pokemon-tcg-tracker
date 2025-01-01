"use client";
import PokemonCard from "@/components/PokemonCard";
import { CardsActionKind, selectedCardsReducer } from "@/hooks/cardsReducer";
import { useCallback, useReducer } from "react";
import { CardExpansionSetApiResponse } from "../app/api/card-expansion-set/route";
import { api } from "@/lib/http";
import { CardApiResponse } from "@/app/api/my-collection/route";
import { toast } from "sonner";
import { Button } from "./ui/button";
import FilterForm, { FilterFormType } from "./my-collection/FilterForm";

const getUserCards = async (
  expansionSetCode: CardExpansionSetApiResponse[0]["code"],
  filter?: FilterFormType
) => {
  const response = await api.get<CardApiResponse>("my-collection", {
    params: { expansionSetCode, filter },
  });
  if (!response.status) {
    throw new Error("Failed to fetch user data");
  }
  return response.data;
};
export interface CardCollectionProps {
  expansionSetCode: CardExpansionSetApiResponse[0]["code"];
}
export default function CardCollection({
  expansionSetCode,
}: CardCollectionProps) {
  const [cards, dispatch] = useReducer(selectedCardsReducer, []);

  const fetchData = useCallback(
    async (filter?: FilterFormType) => {
      const data = await getUserCards(expansionSetCode, filter);
      dispatch({ type: CardsActionKind.SET_STATE, payload: data });
    },
    [expansionSetCode]
  );

  const handleSubmit = async () => {
    const submitData = cards
      .filter((c) => c.quantity > 0)
      .map((c) => {
        const { id, quantity } = c;
        return { cardId: id, quantity };
      });

    api.post("my-collection", submitData).then(() => {
      toast.success("My collection data saved sucessfully!");
    });
  };

  const onSubmitFilter = (formData: FilterFormType) => {
    fetchData(formData);
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
        <FilterForm onSubmit={onSubmitFilter} />
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
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">
            Reset
          </Button>
        </div>
      </main>
    </div>
  );
}
