import { deleteComment } from "@/actions/comments";
import { CommentsPage, TweetsPage } from "@/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: async (deletedComment) => {
      const commentQueryFilter = {
        queryKey: ["comments"],
      } satisfies QueryFilters;
      const tweetQueryFilter = {
        queryKey: ["tweet-feed"],
      } satisfies QueryFilters;

      await queryClient.cancelQueries(commentQueryFilter);
      await queryClient.cancelQueries(tweetQueryFilter);

      queryClient.setQueriesData<InfiniteData<CommentsPage, string | null>>(
        commentQueryFilter,
        (oldData) => {
          if (!oldData) return;

          const newPages = oldData.pages.map((page) => ({
            ...page,
            comments: page.comments.filter((c) => c.id !== deletedComment.id),
          }));

          return {
            ...oldData,
            pages: newPages,
          };
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
                  t.id === deletedComment.tweetId
                    ? t._count.comments - 1
                    : t._count.comments,
              },
            })),
          }));
          return {
            ...oldData,
            pages: newPages,
          };
        },
      );

      toast.success("Comment deleted");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete the post. Please try again");
    },
  });

  return mutation;
};
