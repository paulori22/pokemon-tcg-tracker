import DeckList from "@/components/deck/DeckList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const decks = [
  {
    deck: {
      id: 1,
      name: "Mockup deck",
      strategy: "dfdsfdfsdfs fsdf",
      userId: "ds",
      createdAt: "2025-03-11T00:00:00.000Z",
    },
    rateAverage: 4.98,
    rateCount: 60,
  },
  {
    deck: {
      id: 2,
      name: "Mockup deck",
      strategy: "dfdsfdfsdfs fsdf",
      userId: "ds",
      createdAt: "2025-03-11T00:00:00.000Z",
    },
    rateAverage: 4.98,
    rateCount: 60,
  },
  {
    deck: {
      id: 3,
      name: "Mockup deck",
      strategy: "dfdsfdfsdfs fsdf",
      userId: "ds",
      createdAt: "2025-03-11T00:00:00.000Z",
    },
    rateAverage: 4.98,
    rateCount: 60,
  },
  {
    deck: {
      id: 4,
      name: "Mockup deck",
      strategy: "dfdsfdfsdfs fsdf",
      userId: "ds",
      createdAt: "2025-03-11T00:00:00.000Z",
    },
    rateAverage: 4.98,
    rateCount: 60,
  },
  {
    deck: {
      id: 5,
      name: "Mockup deck",
      strategy: "dfdsfdfsdfs fsdf",
      userId: "ds",
      createdAt: "2025-03-11T00:00:00.000Z",
    },
    rateAverage: 4.98,
    rateCount: 60,
  },
];

export default async function DeckPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p>List of shared decks of the comunity</p>

      <DeckList decks={decks} />
      <div className="fixed bottom-4 right-4 z-50 flex flex-row gap-2">
        <Link href="/deck/new">
          <Button className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-blue-600">
            New Deck
          </Button>
        </Link>
      </div>
    </div>
  );
}
