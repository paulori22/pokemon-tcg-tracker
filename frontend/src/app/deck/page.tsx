"use client";
import DeckList from "@/components/deck/DeckList";
import { Button } from "@/components/ui/button";
import useHttp from "@/hooks/useHttp";
import { api } from "@/lib/http";
import Link from "next/link";
import { useEffect } from "react";
import { DeckResponse } from "../api/deck/route";

export default function DeckPage() {
  const { sendPromiseRequest: getPublicDecks, responseData: publicDecks } =
    useHttp<DeckResponse[]>();

  useEffect(() => {
    getPublicDecks(api.get<DeckResponse[]>("deck"));
  }, []);

  console.log(publicDecks);
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p>List of public decks of the comunity</p>

      <DeckList
        decks={
          publicDecks?.length
            ? publicDecks?.map((deck) => {
                return {
                  deck: {
                    id: deck.id,
                    name: deck.name,
                    strategy: deck.strategy,
                    userId: deck.userId,
                    createdAt: deck.createdAt as unknown as string,
                  },
                  cards: deck.cards.reduce((acc: typeof deck.cards, card) => {
                    for (let index = 0; index < card.quantity; index++) {
                      acc.push(card);
                    }
                    return acc;
                  }, []),
                  rateAverage: deck.rateAverage,
                  rateCount: deck.rateCount,
                };
              })
            : []
        }
      />
      <div className="fixed bottom-4 right-4 z-50 flex flex-row gap-2">
        <Link href="/deck/new">
          <Button className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-blue-600">
            Create a Deck
          </Button>
        </Link>
      </div>
    </div>
  );
}
