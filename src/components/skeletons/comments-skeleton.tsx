import { Skeleton } from "../ui/skeleton";

const sizes = {
  contentHeights: [50, 40, 70, 80, 60],
  contentWidths: [100, 80, 70, 90, 80],
};

export const CommentsSkeleton = () => {
  return (
    <div className="space-y-3 p-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <CommentSkeleton
          key={i}
          contentHeight={sizes["contentHeights"][i]}
          contentWidth={sizes["contentWidths"][i]}
        />
      ))}
    </div>
  );
};

const CommentSkeleton = ({
  contentHeight,
  contentWidth,
}: {
  contentHeight: number;
  contentWidth: number;
}) => {
  return (
    <div className="flex gap-2">
      <Skeleton className="size-9 min-w-9 rounded-full" />
      <Skeleton
        className="rounded-lg"
        style={{ height: `${contentHeight}px`, width: `${contentWidth}%` }}
      />
      <Skeleton className="h-3 min-w-6" />
    </div>
  );
};
