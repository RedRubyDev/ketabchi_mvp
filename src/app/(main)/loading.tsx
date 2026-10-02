import { Skeleton, BookGridSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-10">
      <Skeleton className="h-40 w-full rounded-xl" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-40" />
        <BookGridSkeleton count={5} />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-40" />
        <BookGridSkeleton count={5} />
      </div>
    </div>
  );
}
