import { CardExpansionSetApiResponse } from "@/app/api/card-expansion-set/route";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Link from "next/link";

dayjs.extend(localizedFormat);

export default async function Page() {
  const response = await fetch("http://localhost:3000/api/card-expansion-set");
  const cardExpansionSets =
    (await response.json()) as CardExpansionSetApiResponse;

  return (
    <div className="flex flex-row flex-wrap gap-4">
      {cardExpansionSets.map((expansionSet) => {
        const releaseDate = dayjs(expansionSet.releasedAt);
        return (
          <Link
            key={expansionSet.code}
            href={`/my-collection/${expansionSet.code}`}
          >
            <Card className="max-w-60">
              <CardHeader>
                <CardTitle>{expansionSet.name}</CardTitle>
                <CardDescription>{releaseDate.format("LL")}</CardDescription>
              </CardHeader>
              <CardContent>
                {expansionSet.imagePath && (
                  <Image
                    alt={expansionSet.name}
                    src={expansionSet.imagePath}
                    width={300}
                    height={300}
                  />
                )}
              </CardContent>
              <CardFooter>
                <CardDescription>
                  {expansionSet.totalCards} cards
                </CardDescription>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
