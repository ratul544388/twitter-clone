import { updateProfile } from "@/actions/users";
import { UpdateProfileValues } from "@/lib/validations";
import { TweetsPage } from "@/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useModalStore } from "./use-modal-store";
import { useCurrentUser } from "./use-current-user";
import { useRouter } from "next/navigation";

export const useUpdateProfileMutation = () => {
  const { onClose } = useModalStore();
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (values: UpdateProfileValues) => {
      const user = await updateProfile(values);
      return user;
    },
    onSuccess: async (updatedUser) => {
      const queryFilter = {
        queryKey: ["tweet-feed"],
      } satisfies QueryFilters;

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<TweetsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;
          const newPages = oldData.pages.map((page) => ({
            ...page,
            tweets: page.tweets.map((t) => ({
              ...t,
              user: t.userId === currentUser?.id ? updatedUser : t.user,
            })),
          }));

          return {
            ...oldData,
            pages: newPages,
          };
        },
      );
      router.refresh();
      router.push(`/${updatedUser.username}`);
      onClose();
    },
  });

  return mutation;
};
