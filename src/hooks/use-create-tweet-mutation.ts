import { createTweet } from "@/actions/tweets";
import { TweetsPage } from "@/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useCurrentUser } from "./use-current-user";

export const useCreateTweetMutation = () => {
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();

  const mutation = useMutation({
    mutationFn: createTweet,
    onSuccess: async (newTweet) => {
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
        //@ts-ignore
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];
          if (firstPage) {
            return {
              pageParams: oldData?.pageParams,
              pages: [
                {
                  tweets: [newTweet, ...firstPage.tweets],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return queryFilter.predicate(query) && !query.state.data;
        },
      });

      toast.success("Tweet posted");
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to post the tweet");
    },
  });

  return mutation;
};
