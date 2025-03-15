import { Deck as DeckType } from "@prisma/client";
import BasicPokemonCard from "./BasicPokemonCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

interface DeckProp
  extends Omit<DeckType, "updatedAt" | "createdAt" | "visibility"> {
  createdAt: string;
}

export interface DeckProps {
  deck: DeckProp;
  rateAverage: number;
  rateCount: number;
}

export default function Deck({ deck, rateAverage, rateCount }: DeckProps) {
  const createdAt = dayjs(deck.createdAt);
  return (
    <Card className={`rounded-lg`}>
      <CardHeader>
        <CardTitle>{deck.name}</CardTitle>
        <CardDescription>
          <p className="pb-2">Created at {createdAt.format("LLL")} by UserA</p>
          <div className="flex items-center">
            <svg
              className="me-1 h-4 w-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
              {rateAverage}
            </p>
            <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400"></span>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {rateCount} ratings
            </p>
          </div>
        </CardDescription>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Strategy</AccordionTrigger>
            <AccordionContent>{deck.strategy}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-1">
          {Array.from({ length: 20 }).map((_, index) => {
            return (
              <BasicPokemonCard
                key={index}
                pokemonCard={{
                  id: "A1-002",
                  name: "Ivysaur",
                  rarity: "TwoDiamond",
                  type: "Grass",
                  imagePath: "/genetic-apex/A1_002_EN.webp",
                  cardExpasionSets: [
                    {
                      numberInExpasionSet: 2,
                      cardExpasionSet: {
                        id: 1,
                        code: "A1",
                        name: "Genetic Apex",
                        totalCards: 286,
                        releasedAt: "2024-10-30T00:00:00.000Z",
                        imagePath: "/logo_expansion_A1_en_US.webp",
                      },
                    },
                  ],
                  cardBoosters: [
                    {
                      cardBooster: {
                        id: 3,
                        name: "Mewtwo",
                        cardExpasionSet: {
                          id: 1,
                          code: "A1",
                          name: "Genetic Apex",
                          totalCards: 286,
                        },
                      },
                    },
                  ],
                  quantity: 1,
                }}
                quantity={2}
              />
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center">
          Your Rate:
          <svg
            className="ms-1 h-4 w-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="ms-1 h-4 w-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="ms-1 h-4 w-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="ms-1 h-4 w-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="ms-1 h-4 w-4 text-gray-300 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </div>
      </CardFooter>
    </Card>
  );
}
