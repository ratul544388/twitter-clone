"use client";

import { getBookmarkedTweets } from "@/actions/bookmarks";
import { EmptyState } from "@/components/empty-state";
import { Error } from "@/components/error";
import { InfiniteScrollContainer } from "@/components/infinite-scroll-container";
import { Loader } from "@/components/loader";
import { TweetsSkeleton } from "@/components/skeletons/tweets-skeleton";
import { Tweet } from "@/components/tweets/tweet";
import { useInfiniteQuery } from "@tanstack/react-query";

export const BookmarkFeed = () => {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["post-feed", "bookmarked"],
      queryFn: async ({pageParam: cursor}) => getBookmarkedTweets({cursor}),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const tweets = data?.pages.flatMap((page) => page.tweets) || [];

  if (status === "pending") {
    return <TweetsSkeleton />;
  }

  if (status === "error") {
    return <Error />;
  }

  if (status === "success" && !!!tweets.length) {
    return (
      <EmptyState
        title="No bookmarks found"
        description="You haven't bookmarked any post yet"
      />
    );
  }

  return (
    <InfiniteScrollContainer
      onBottomReached={() =>
        hasNextPage && !isFetchingNextPage && fetchNextPage()
      }
    >
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
      {isFetchingNextPage && <Loader className="mx-auto my-3" size={32} />}
    </InfiniteScrollContainer>
  );
};
