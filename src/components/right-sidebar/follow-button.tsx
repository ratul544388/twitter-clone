"use client";

import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useFollowerInfo } from "@/hooks/use-follower-info";
import { FollowerInfo } from "@/types";
import { createFollow, deleteFollow } from "@/actions/follow";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useModalStore } from "@/hooks/use-modal-store";

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
  className?: string;
  preventLinkRedirect?: boolean;
}

export const FollowButton = ({
  userId,
  initialState,
  className,
  preventLinkRedirect,
}: FollowButtonProps) => {
  const queryClient = useQueryClient();
  const followerInfo = useFollowerInfo({ userId, initialState });
  const currentUser = useCurrentUser();
  const { onOpen } = useModalStore();

  const queryKey: QueryKey = ["follower-info", userId];

  const { mutate } = useMutation({
    mutationFn: async () =>
      followerInfo.isFollowing
        ? await deleteFollow(userId)
        : await createFollow(userId),
    onMutate: async () => {
      if (!currentUser) {
        return onOpen("login");
      }
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

      queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
        followers:
          (previousState?.followers || 0) +
          (previousState?.isFollowing ? 1 : 1),
        isFollowing: !previousState?.isFollowing,
      }));

      return { previousState };
    },

    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    },
  });

  const label = followerInfo.isFollowing ? "Unfollow" : "Follow";
  const variant = followerInfo.isFollowing ? "outline" : "default";
  return (
    <Button
      onClick={(e) => {
        mutate();
        if (preventLinkRedirect) {
          e.preventDefault();
        }
      }}
      className={cn("rounded-full", className)}
      size="sm"
      variant={variant}
    >
      {label}
    </Button>
  );
};
