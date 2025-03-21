"use client";

import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import BasicPokemonCard from "@/components/deck/BasicPokemonCard";
import { api } from "@/lib/http";
import { CardDeckApiResponse } from "@/app/api/card/route";
import useHttp from "@/hooks/useHttp";
import { Button } from "@/components/ui/button";
import CardsAvailable from "@/components/deck/CardsAvailable";
import { Visibility } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  name: z.string().nonempty(),
  strategy: z.string().nonempty(),
  visibility: z.nativeEnum(Visibility),
  cards: z.array(z.string()),
});

export type DeckFormType = z.infer<typeof formSchema>;

export default function DeckNew() {
  const { sendPromiseRequest, responseData: allCards } =
    useHttp<CardDeckApiResponse>();

  useEffect(() => {
    sendPromiseRequest(api.get<CardDeckApiResponse>("card"));
  }, [sendPromiseRequest]);

  const form = useForm<DeckFormType>({
    defaultValues: {
      name: "",
      strategy: "",
      visibility: "Private",
      cards: [],
    },
    resolver: zodResolver(formSchema),
  });

  const deckCards = form.watch("cards");

  const onClickAvailableCard = useCallback(
    (cardId: string) => {
      console.log("clicked card", cardId);
      const deckCards = form.getValues("cards");
      if (deckCards.length >= 20) {
        toast.error("Deck cannot add more than 20 cards to a deck");
        return;
      }
      if (deckCards.filter((c) => c === cardId).length >= 2) {
        toast.error("Deck cannot have more than 2 of the same card");
        return;
      }
      form.setValue("cards", [...deckCards, cardId]);
    },
    [form],
  );

  const onClickDeckCard = useCallback(
    (cardId: string) => {
      const deckCards = form.getValues("cards");

      const updatedCards = [...deckCards];
      const indexToRemove = updatedCards.indexOf(cardId);
      if (indexToRemove !== -1) {
        updatedCards.splice(indexToRemove, 1);
        form.setValue("cards", updatedCards);
      }
    },
    [form],
  );

  const router = useRouter();

  const handleSubmit = useCallback((formData: DeckFormType) => {
    console.log("submit", formData);
    if (formData.cards.length !== 20) {
      toast.error("Deck should have 20 cards");
      return;
    }
    api.post("deck", formData).then(() => {
      toast.success("Deck successfully created!");
      router.push("/deck");
    });
  }, []);

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 py-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input placeholder="" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="strategy"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Label htmlFor="strategy">Strategy</Label>
                    <Textarea placeholder="" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem className="flex flex-row content-center gap-2">
                <FormLabel>Visibility</FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex flex-row gap-2"
                    defaultValue={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <RadioGroupItem value={"Private"} id={"Private"} />
                      <Label htmlFor={"Private"}>Private</Label>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <RadioGroupItem value={"Public"} id={"Public"} />
                      <Label htmlFor={"Public"}>Public</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="fixed bottom-4 right-4 z-50 flex flex-row gap-2">
            <Button
              type="submit"
              className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-blue-600"
            >
              Create Deck
            </Button>
          </div>
        </form>
      </Form>
      <div>
        <div>
          <h3 className="text-2xl">Deck Cards ({deckCards.length}/20)</h3>
          <div className="flex flex-row flex-wrap items-center justify-center justify-items-center gap-2">
            {deckCards
              .sort((cardAId, cardBId) => {
                const cardA = allCards?.find((c) => c.id === cardAId);
                const cardB = allCards?.find((c) => c.id === cardBId);
                if (!cardA || !cardB) {
                  return 0;
                }

                if (cardA.type !== "Trainer" && cardB.type === "Trainer") {
                  return -1;
                }

                if (cardA.type === "Trainer" && cardB.type !== "Trainer") {
                  return 1;
                }

                return cardA.id.localeCompare(cardB.id);
              })
              .map((cardId: string, index: number) => {
                const card = allCards?.find((c) => c.id === cardId);
                if (!card) {
                  return null;
                }
                return (
                  <BasicPokemonCard
                    key={cardId + "_deck_" + index}
                    pokemonCard={card}
                    className="hover:cursor-pointer hover:border hover:border-red-700"
                    onCLick={onClickDeckCard}
                  />
                );
              })}
          </div>
        </div>
        <div>
          <h3 className="text-2xl">All Cards</h3>
          <CardsAvailable cardOnClick={onClickAvailableCard} />
        </div>
      </div>
    </div>
  );
}
