"use client";

import { getComments } from "@/actions/comments";
import { EmptyState } from "@/components/empty-state";
import { Error } from "@/components/error";
import { InfiniteScrollContainer } from "@/components/infinite-scroll-container";
import { Loader } from "@/components/loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Comment } from "./comment";
import { CommentsSkeleton } from "./skeletons/comments-skeleton";
import { TweetData } from "@/types";

export const Comments = ({ tweet }: { tweet: TweetData }) => {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", tweet?.id],
      queryFn: async ({ pageParam: cursor }) =>
        getComments({ cursor, tweetId: tweet.id }),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const comments = data?.pages.flatMap((page) => page.comments) || [];

  return (
    <InfiniteScrollContainer
      onBottomReached={() =>
        hasNextPage && !isFetchingNextPage && fetchNextPage()
      }
      className="py-2"
    >
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      {status === "pending" && !!tweet?._count.comments && <CommentsSkeleton />}
      {status === "error" && <Error />}
      {status === "error" && <EmptyState />}
      {isFetchingNextPage && <Loader className="mx-auto my-3" size={32} />}
    </InfiniteScrollContainer>
  );
};
