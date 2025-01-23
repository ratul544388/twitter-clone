import { getFollowerInfo } from "@/actions/follow";
import { FollowerInfo } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useFollowerInfo({
  userId,
  initialState,
}: {
  userId: string;
  initialState: FollowerInfo;
}) {

  const {data} = useQuery({
    queryKey: ["follower-info", userId],
    queryFn: async () => await getFollowerInfo(userId),
    initialData: initialState,
    staleTime: Infinity,
  });

  return data;
};
