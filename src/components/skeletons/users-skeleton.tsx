import { Skeleton } from "../ui/skeleton";

interface UserSkeletonProps {
  count?: number;
}

export const UsersSkeleton = ({ count = 20 }: UserSkeletonProps) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center p-2">
          <Skeleton className="size-9 rounded-full" />
          <div className="space-y-1 ml-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-10 w-24 rounded-full ml-auto" />
        </div>
      ))}
    </div>
  );
};
