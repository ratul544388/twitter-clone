"use client";

import { like } from "@/actions/likes";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { TweetData, TweetsPage } from "@/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "sonner";

interface LikeButtonProps {
  tweet: TweetData;
}

export const LikeButton = ({ tweet }: LikeButtonProps) => {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();
  const isLiked = tweet.likes.some((like) => like.userId === currentUser?.id);
  const queryFilter = {
    queryKey: ["tweet-feed"],
  } satisfies QueryFilters;

  const { mutate } = useMutation({
    mutationFn: async () => {
      await like({ isLiked, tweetId: tweet.id });
    },
    onMutate: async () => {
      if (!currentUser) return;
      await queryClient.cancelQueries(queryFilter);

      const previousData =
        queryClient.getQueriesData<InfiniteData<TweetsPage, string | null>>(
          queryFilter,
        );

      queryClient.setQueriesData<InfiniteData<TweetsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;
          const updatedPages = oldData.pages.map((page) => ({
            ...page,
            tweets: page.tweets.map((p) =>
              p.id === tweet.id
                ? {
                    ...p,
                    likes: isLiked ? [] : [{ userId: currentUser.id }],
                    _count: {
                      ...p._count,
                      likes: isLiked ? p._count.likes - 1 : p._count.likes + 1,
                    },
                  }
                : p,
            ),
          }));
          return {
            ...oldData,
            pages: updatedPages,
          };
        },
      );

      return { previousData };
    },
    onError: (error, variables, context) => {
      toast.error(error.message);
      if (context?.previousData) {
        context.previousData.forEach(([Key, data]) => {
          queryClient.setQueryData(Key, data);
        });
      }
    },
  });

  const HeartIcon = isLiked ? FaHeart : FaRegHeart;
  return (
    <li>
      <button
        onClick={() => mutate()}
        className={cn(
          "group flex items-center text-muted-foreground hover:text-rose-500",
          isLiked && "text-rose-500",
        )}
      >
        <span className="rounded-full p-2 group-hover:bg-rose-900/20">
          <HeartIcon className="size-4" />
        </span>
        <span className={cn("text-sm")}>{tweet._count.likes}</span>
      </button>
    </li>
  );
};
