import { TweetSkeleton } from "./tweet-skeleton";

export const TweetsSkeleton = ({ count = 10 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <TweetSkeleton key={i} />
      ))}
    </>
  );
};
