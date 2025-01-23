import { updateComment } from "@/actions/comments";
import { CommentsPage } from "@/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateComment,
    onSuccess: async (updatedComment) => {
      const queryFilter = {
        queryKey: ["comments"],
      } satisfies QueryFilters;

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<CommentsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;
          const newPages = oldData.pages.map((page) => ({
            ...page,
            comments: page.comments.map((c) =>
              c.id === updatedComment.id ? updatedComment : c,
            ),
          }));
          return {
            ...oldData,
            pages: newPages,
          };
        },
      );

      toast.success("Comment Updated");
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to post the tweet");
    },
  });

  return mutation;
};
