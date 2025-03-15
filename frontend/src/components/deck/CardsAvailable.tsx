"use client";

import { memo, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import BasicPokemonCard from "@/components/deck/BasicPokemonCard";
import { api } from "@/lib/http";
import { CardDeckApiResponse } from "@/app/api/card/route";
import useHttp from "@/hooks/useHttp";
import CardCollectionSkeleton from "../my-collection/CardCollectionSkeleton";

export interface CardsAvailableProps {
  cardOnClick: (cardId: string) => void;
}

export const formSchema = z.object({
  name: z.string(),
  /*   max5Cards: z.boolean(),
  booster: z.string(), */
});

export type FilterFormType = z.infer<typeof formSchema>;

export default memo(function CardsAvailable({
  cardOnClick,
}: CardsAvailableProps) {
  const {
    sendPromiseRequest,
    responseData: allCards,
    isLoading: allCardsIsLoading,
  } = useHttp<CardDeckApiResponse>();

  useEffect(() => {
    sendPromiseRequest(api.get<CardDeckApiResponse>("card"));
  }, [sendPromiseRequest]);

  const form = useForm<FilterFormType>({
    defaultValues: { name: "" },
    resolver: zodResolver(formSchema),
  });

  const formData = form.watch();
  const filteredCards = useMemo(() => {
    return allCards?.filter((card) => {
      return card.name.toLowerCase().includes(formData.name.toLowerCase());
    });
  }, [allCards, formData.name]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>
        <Form {...form}>
          <form className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-center gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Search by name or number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*               <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="max5Cards"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Label htmlFor="max5Cards">5 cards per row</Label>
              </div> */}
            </div>
          </form>
        </Form>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center justify-items-center gap-2">
        {allCardsIsLoading && <CardCollectionSkeleton numberOfCards={50} />}
        {filteredCards?.map((card) => {
          return (
            <BasicPokemonCard
              key={card.id}
              pokemonCard={card}
              className="hover:cursor-pointer hover:border hover:border-green-700"
              onCLick={cardOnClick}
            />
          );
        })}
      </div>
    </div>
  );
});
