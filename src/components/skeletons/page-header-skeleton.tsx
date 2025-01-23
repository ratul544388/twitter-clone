import { Skeleton } from "../ui/skeleton";

interface PageHeaderSkeletonProps {
  doubleLabel?: boolean;
  showBackButton?: boolean;
}

export const PageHeaderSkeleton = ({
  showBackButton = true,
  doubleLabel,
}: PageHeaderSkeletonProps) => {
  return (
    <div className="flex h-16 w-full items-center gap-3 border-b px-4">
      <Skeleton className="size-6 rounded-full md:hidden" />
      {showBackButton && <Skeleton className="size-8 rounded-full" />}
      <div className="space-y-1">
        <Skeleton className="h-[18px] w-20 rounded-full" />
        {doubleLabel && <Skeleton className="h-3.5 w-10 rounded-full" />}
      </div>
    </div>
  );
};
