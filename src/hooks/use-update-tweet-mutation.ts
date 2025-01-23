import { updateTweet } from "@/actions/tweets";
import { TweetData, TweetsPage } from "@/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useCurrentUser } from "./use-current-user";

export const useUpdateTweetMutation = () => {
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();

  const mutation = useMutation({
    mutationFn: updateTweet,
    onSuccess: async (updatedTweet) => {
      const queryFilter = {
        queryKey: ["tweet-feed"],
        predicate(query) {
          return (
            query.queryKey.includes("for-you-tweets") ||
            (query.queryKey.includes("user-tweets") &&
              query.queryKey.includes(currentUser?.id))
          );
        },
      } satisfies QueryFilters;

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<TweetsPage, string | null>>(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        queryFilter,
        (oldData) => {
          if (!oldData) return;
          const newPages = oldData.pages.map((page: TweetsPage) => ({
            ...page,
            tweets: page.tweets.map((p) =>
              p.id === (updatedTweet as TweetData).id ? updatedTweet : p,
            ),
          }));
          return {
            ...oldData,
            pages: newPages,
          };
        },
      );
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to post the tweet");
    },
  });

  return mutation;
};
