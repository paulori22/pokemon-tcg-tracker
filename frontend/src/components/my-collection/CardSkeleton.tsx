import { Skeleton } from "@/components/ui/skeleton";

export default function CardSkeleton() {
  return (
    <div className="flex max-w-44 flex-col items-center justify-center justify-items-center gap-2 p-1">
      <Skeleton className="h-[200] w-[150px]" />
      <div className="flex flex-col flex-wrap items-center gap-1">
        <Skeleton className="h-4 w-[66px]" />
        <Skeleton className="h-4 w-[42px]" />
      </div>
    </div>
  );
}
