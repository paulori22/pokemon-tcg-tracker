import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import Deck, { DeckProps } from "./Deck";

export interface DeckListProps {
  decks: DeckProps[];
}

export default function DeckList({ decks }: DeckListProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div>Filters</div>
      <div className="flex flex-row flex-wrap justify-center gap-2">
        {decks.map((deck, index) => {
          return <Deck key={index} {...deck} />;
        })}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
