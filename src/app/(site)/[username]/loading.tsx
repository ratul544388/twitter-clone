import { PageHeaderSkeleton } from "@/components/skeletons/page-header-skeleton";
import { TweetsSkeleton } from "@/components/skeletons/tweets-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="relative">
      <PageHeaderSkeleton doubleLabel/>
      <Skeleton className="h-52" />
      <Skeleton className="absolute left-3 ml-3 size-40 -translate-y-1/2 rounded-full" />
      <div className="px-4">
        <Skeleton className="ml-auto mt-5 h-10 w-20 rounded-full" />
        <Skeleton className="mt-10 h-7 w-32" />
        <Skeleton className="mt-2 h-5 w-24" />
        <div className="mt-3 flex gap-2">
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="size-3.5" />
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="size-3.5" />
        </div>
        <Skeleton className="mt-4 h-3.5 w-full" />
        <Skeleton className="mt-4 h-3.5 w-full" />
        <Skeleton className="mt-4 h-3.5 w-1/2" />
      </div>
      <div className="mt-10 flex justify-around border-b">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </div>
      <TweetsSkeleton />
    </div>
  );
};

export default Loading;
