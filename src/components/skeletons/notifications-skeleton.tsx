import { Skeleton } from "../ui/skeleton";

export const NotificationsSkeleton = ({ count = 10 }: { count?: number }) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center p-2">
          <Skeleton className="size-9 rounded-full" />
          <Skeleton className="ml-2 h-4 w-[80%]" />
        </div>
      ))}
    </div>
  );
};
