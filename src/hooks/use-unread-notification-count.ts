import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "./use-current-user";
import { getUnreadNotificationCount } from "@/actions/notifications";

export const useUnreadNotificationCount = () => {
  const currentUser = useCurrentUser();
  const { data: unreadNotificationCount } = useQuery({
    queryKey: ["unread-notifications"],
    queryFn: async () => getUnreadNotificationCount(),
    refetchInterval: 60 * 1000,
    enabled: !!currentUser,
  });

  return unreadNotificationCount;
};
