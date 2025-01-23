"use client";

import {
  getNotifications,
  markNotificationsAsRead,
} from "@/actions/notifications";
import { EmptyState } from "@/components/empty-state";
import { Error } from "@/components/error";
import { InfiniteScrollContainer } from "@/components/infinite-scroll-container";
import { Loader } from "@/components/loader";
import { NotificationsSkeleton } from "@/components/skeletons/notifications-skeleton";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { UserRoundX } from "lucide-react";
import { Notification } from "./notification";
import { useEffect } from "react";

export const Notifications = () => {
  const queryClient = useQueryClient();
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["notifications"],
      queryFn: async ({ pageParam: cursor }) => await getNotifications(cursor),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const { mutate } = useMutation({
    mutationFn: async () => await markNotificationsAsRead(),
    onMutate: async () => {
      queryClient.setQueryData<number>(["unread-notifications"], 0);
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  const notifications = data?.pages.flatMap((page) => page.notifications) || [];

  if (!!!notifications.length && status !== "pending") {
    return <EmptyState icon={UserRoundX} title="No notifications found" />;
  }

  if (status === "pending") {
    return <NotificationsSkeleton />;
  }

  if (status === "error") {
    return <Error />;
  }

  return (
    <InfiniteScrollContainer
      className="mt-3"
      onBottomReached={() =>
        hasNextPage && !isFetchingNextPage && fetchNextPage()
      }
    >
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
      {isFetchingNextPage && <Loader className="mx-auto my-3" size={32} />}
    </InfiniteScrollContainer>
  );
};
