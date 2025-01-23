"use client";

import { getTweets } from "@/actions/tweets";
import { EmptyState } from "@/components/empty-state";
import { Error } from "@/components/error";
import { InfiniteScrollContainer } from "@/components/infinite-scroll-container";
import { Loader } from "@/components/loader";
import { TweetsSkeleton } from "@/components/skeletons/tweets-skeleton";
import { Tweet } from "@/components/tweets/tweet";
import { cn } from "@/lib/utils";
import { QueryKey } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Comments } from "./comments";
import { CommentsSkeleton } from "./skeletons/comments-skeleton";
import { Tabs } from "./tabs";

interface TweetFeedProps {
  take?: number;
  fetchOnce?: boolean;
  tabs?: QueryKey[];
  userId?: string;
  className?: string;
  type?: QueryKey;
  q?: string;
  tweetId?: string;
  showComments?: boolean;
}

export const TweetFeed = ({
  take = 10,
  fetchOnce,
  tabs,
  userId,
  className,
  type,
  q,
  tweetId,
  showComments,
}: TweetFeedProps) => {
  const [activeTab, setActiveTab] = useState<QueryKey | undefined>(
    tabs?.[0] || type,
  );

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["tweet-feed", activeTab, userId, q, tweetId],
      queryFn: async ({ pageParam: cursor }) =>
        getTweets({ queryKey: activeTab, cursor, take, userId, q, tweetId }),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const tweets = data?.pages.flatMap((page) => page.tweets) || [];

  return (
    <div className={cn(className)}>
      {!!tabs?.length && activeTab && (
        <Tabs queryKeys={tabs} value={activeTab} onChange={setActiveTab} />
      )}
      <InfiniteScrollContainer
        onBottomReached={() =>
          hasNextPage && !isFetchingNextPage && !fetchOnce && fetchNextPage()
        }
      >
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} showCommentInput />
        ))}
        {status === "pending" && <TweetsSkeleton count={take} />}
        {status === "error" && <Error />}
        {status === "success" && !!!tweets.length && (
          <EmptyState title="No Tweets Found" />
        )}
        {!hasNextPage && !isFetchingNextPage && !!tweets.length && !tweetId && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            No more posts found in this feed
          </p>
        )}
        {isFetchingNextPage && <Loader className="mx-auto my-3" size={32} />}
      </InfiniteScrollContainer>
      {showComments && (
        <>
          {status === "pending" ? (
            <CommentsSkeleton />
          ) : (
            <Comments tweet={tweets[0]} />
          )}
        </>
      )}
    </div>
  );
};
