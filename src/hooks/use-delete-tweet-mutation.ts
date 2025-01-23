import { deleteTweet } from "@/actions/tweets";
import { TweetsPage } from "@/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export const useDeleteTweetMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const mutation = useMutation({
    mutationFn: deleteTweet,
    onSuccess: async (deletedTweet) => {
      if (pathname === `/tweets/${deletedTweet.id}`) {
        router.push("/");
      }
      const queryFilter = { queryKey: ["tweet-feed"] } satisfies QueryFilters;

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<TweetsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;
          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              tweets: page.tweets.filter((post) => post.id !== deletedTweet.id),
            })),
          };
        },
      );

      toast.success("Tweet deleted");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete the post. Please try again");
    },
  });

  return mutation;
};
