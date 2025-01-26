import CardSkeleton from "./CardSkeleton";

interface CardCollectionSkeleton {
  numberOfCards: number;
}

export default function CardCollectionSkeleton({
  numberOfCards,
}: CardCollectionSkeleton) {
  const skeletonsCards = Array.from({ length: numberOfCards });
  return skeletonsCards.map((_, index) => <CardSkeleton key={index} />);
}
