"use client";

import { bookmark } from "@/actions/bookmarks";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useModalStore } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { TweetData, TweetsPage } from "@/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toast } from "sonner";

interface BookmarkButtonProps {
  tweet: TweetData;
}

export const BookmarkButton = ({ tweet }: BookmarkButtonProps) => {
  const currentUser = useCurrentUser();
  const {onOpen} = useModalStore();
  const queryClient = useQueryClient();
  const isBookmarked = tweet.bookmarks.some(
    (b) => b.userId === currentUser?.id,
  );
  const queryFilter = {
    queryKey: ["tweet-feed"],
  } satisfies QueryFilters;

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!currentUser) {
        return onOpen("login");
      }
      await bookmark({ isBookmarked, tweetId: tweet.id });
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
            tweets: page.tweets.map((t) =>
              t.id === tweet.id
                ? {
                    ...t,
                    bookmarks: isBookmarked ? [] : [{ userId: currentUser.id }],
                  }
                : t,
            ),
          }));
          return {
            ...oldData,
            pages: updatedPages,
          };
        },
      );

      if (isBookmarked) {
        toast.success("Tweet removed from bookmark");
      } else {
        toast.success("Tweet added to bookmark");
      }

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([Key, data]) => {
          queryClient.setQueryData(Key, data);
        });
      }
      toast.error(
        "Error while adding the tweet to bookmark. Please try again.",
      );
    },
  });

  const BookmarkIcon = isBookmarked ? FaBookmark : FaRegBookmark;
  return (
    <li>
      <button onClick={() => mutate()} className="group flex items-center">
        <span className="rounded-full p-2 group-hover:bg-green-900/20">
          <BookmarkIcon
            className={cn(
              "size-4 text-muted-foreground group-hover:text-green-500",
              isBookmarked && "text-green-500",
            )}
          />
        </span>
      </button>
    </li>
  );
};
