import { Skeleton } from "../ui/skeleton";

export const TweetSkeleton = () => {
  return (
    <div className="border-b px-4 py-3">
      <div className="flex items-center gap-2">
        <Skeleton className="size-9 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3.5 w-24" />
        </div>
        <Skeleton className="ml-auto size-10 rounded-full" />
      </div>
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-3 h-4 w-1/2" />
      <div className="mt-5 flex items-center justify-between pr-20">
        <Skeleton className="h-8 w-14" />
        <Skeleton className="h-8 w-14" />
        <Skeleton className="h-8 w-14" />
        <Skeleton className="size-8" />
      </div>
    </div>
  );
};
