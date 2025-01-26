"use client";
import PokemonCard from "@/components/PokemonCard";
import { CardsActionKind, selectedCardsReducer } from "@/hooks/cardsReducer";
import { useCallback, useEffect, useReducer, useState } from "react";
import { CardExpansionSetApiResponse } from "../app/api/card-expansion-set/route";
import { api } from "@/lib/http";
import { CardApiResponse } from "@/app/api/my-collection/route";
import { toast } from "sonner";
import { Button } from "./ui/button";
import FilterForm, {
  FilterFormType,
  formSchema,
} from "./my-collection/FilterForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardCollectionSkeleton from "./my-collection/CardCollectionSkeleton";

const getUserCards = async (
  expansionSetCode: CardExpansionSetApiResponse[0]["code"],
  filter?: FilterFormType,
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
  const [isLoading, setIsLoading] = useState(false);
  const [cards, dispatch] = useReducer(selectedCardsReducer, []);

  const fetchData = useCallback(
    async (filter?: FilterFormType) => {
      setIsLoading(true);
      const data = await getUserCards(expansionSetCode, filter);
      setIsLoading(false);
      dispatch({ type: CardsActionKind.SET_STATE, payload: data });
    },
    [expansionSetCode],
  );

  const handleSubmit = async () => {
    const submitData = cards.map((c) => {
      const { id, quantity } = c;
      return { cardId: id, quantity };
    });

    api.post("my-collection", submitData).then(() => {
      toast.success("My collection data saved sucessfully!");
    });
  };

  const form = useForm<FilterFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", max5Cards: false, onlyMissingCards: false },
  });

  const formData = form.watch();

  const filteredCards = cards
    .filter((c) => {
      return formData.onlyMissingCards ? c.quantity === 0 : true;
    })
    .filter((c) => {
      if (
        c.name.toLowerCase().includes(formData.name.toLowerCase()) ||
        c.id.toLowerCase().includes(formData.name.toLowerCase())
      ) {
        return true;
      }
      return false;
    });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <FilterForm form={form} />
      <div
        className={
          formData.max5Cards
            ? "grid grid-cols-5 gap-2"
            : "flex flex-row flex-wrap items-center justify-center justify-items-center gap-2"
        }
      >
        {isLoading && <CardCollectionSkeleton numberOfCards={50} />}
        {filteredCards.map((pokemonCard) => {
          return (
            <PokemonCard
              key={pokemonCard.id}
              dispatch={dispatch}
              pokemonCard={pokemonCard}
              // Need to pass to rerender the memo component when the quantity change,
              // not sure why the pokemonCard prop do not cause the rerender
              quantity={pokemonCard.quantity}
            />
          );
        })}
      </div>
      <div className="fixed bottom-4 right-4 flex flex-row gap-2">
        <Button
          className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Save
        </Button>
        <Button className="rounded-full bg-red-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-red-600">
          Reset
        </Button>
      </div>
    </>
  );
}
