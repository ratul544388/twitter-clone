import { createComment } from "@/actions/comments";
import { CommentsPage, TweetsPage } from "@/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: async (newComment) => {
      const commentQueryFilter = {
        queryKey: ["comments", newComment.tweetId],
      } satisfies QueryFilters;

      const tweetQueryFilter = {
        queryKey: ["tweet-feed"],
      } satisfies QueryFilters;

      await queryClient.cancelQueries(commentQueryFilter);
      await queryClient.cancelQueries(tweetQueryFilter);

      queryClient.setQueriesData<InfiniteData<CommentsPage, string | null>>(
        commentQueryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];
          if (firstPage) {
            return {
              pageParams: oldData?.pageParams,
              pages: [
                {
                  comments: [newComment, ...firstPage.comments],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );

      queryClient.setQueriesData<InfiniteData<TweetsPage, string | null>>(
        tweetQueryFilter,
        (oldData) => {
          if (!oldData) return;
          const newPages = oldData.pages.map((page) => ({
            ...page,
            tweets: page.tweets.map((t) => ({
              ...t,
              _count: {
                ...t._count,
                comments:
                  t.id === newComment.tweetId ? t._count.comments + 1 : t._count.comments,
              },
            })),
          }));
          return {
            ...oldData,
            pages: newPages,
          };
        },
      );

      toast.success("Comment posted");
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to post the comment");
    },
  });

  return mutation;
};
