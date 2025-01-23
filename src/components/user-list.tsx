"use client";

import { getUserList } from "@/actions/users";
import { QueryKey } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { UserRoundX } from "lucide-react";
import { EmptyState } from "./empty-state";
import { Error } from "./error";
import { InfiniteScrollContainer } from "./infinite-scroll-container";
import { Loader } from "./loader";
import { UsersSkeleton } from "./skeletons/users-skeleton";
import { Button } from "./ui/button";
import { User } from "./user";
import { queries } from "@/constants";

interface UserListProps {
  type: QueryKey;
  take?: number;
  onClickSeeMoreButton?: () => void;
  fetchOnce?: boolean;
  q?: string;
  username?: string;
}

export const UserList = ({
  type,
  take,
  onClickSeeMoreButton,
  fetchOnce,
  q,
  username,
}: UserListProps) => {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["users", type, q, username],
      queryFn: async ({ pageParam }) =>
        await getUserList({ cursor: pageParam, type, take, q, username }),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const users = data?.pages.flatMap((page) => page.users) || [];

  if (!!!users.length && status !== "pending" && !onClickSeeMoreButton) {
    return (
      <EmptyState
        icon={UserRoundX}
        title={queries.find((q) => q.key === type)?.emptyTitle}
        description={queries.find((q) => q.key === type)?.emptyDescription}
      />
    );
  }

  if (status === "pending") {
    return <UsersSkeleton count={take} />;
  }

  if (status === "error") {
    return <Error />;
  }

  return (
    <InfiniteScrollContainer
      onBottomReached={() =>
        hasNextPage && !isFetchingNextPage && !fetchOnce && fetchNextPage()
      }
    >
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
      {onClickSeeMoreButton && hasNextPage && (
        <Button
          onClick={onClickSeeMoreButton}
          variant="outline"
          size="lg"
          className="rounded-none border-x-0"
        >
          See more
        </Button>
      )}
      {isFetchingNextPage && <Loader className="mx-auto my-3" size={32} />}
    </InfiniteScrollContainer>
  );
};
