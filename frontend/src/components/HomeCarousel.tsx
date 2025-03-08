import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function HomeCarousel() {
  return (
    <Carousel opts={{ align: "center" }} className="mx-auto w-full max-w-2xl">
      <CarouselContent>
        <CarouselItem className="flex justify-center">
          <Image
            src={"/carousel/dashboard.png"}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full"
            alt="Dashboard Image"
          />
        </CarouselItem>
        <CarouselItem className="flex justify-center">
          <Image
            src={"/carousel/my_collection_1.png"}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full"
            alt="My Collection Image"
          />
        </CarouselItem>
        <CarouselItem className="flex justify-center">
          <Image
            src={"/carousel/my_collection_2.png"}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full"
            alt="My Collection Card Image"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
