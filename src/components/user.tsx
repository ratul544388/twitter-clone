"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { isFollowing } from "@/lib/utils";
import { UserData } from "@/types";
import Avatar from "./avatar";
import { FollowButton } from "./right-sidebar/follow-button";
import { UserTooltip } from "./user-tooltip";
import Link from "next/link";

interface UserProps {
  user: UserData;
}

export const User = ({ user }: UserProps) => {
  const currentUser = useCurrentUser();
  return (
    <Link
      href={`/${user.username}`}
      key={user.id}
      className="flex items-center gap-2 rounded-md p-2 hover:bg-secondary"
    >
      <UserTooltip user={user}>
        <Avatar src={user.image} alt={user.name} />
      </UserTooltip>
      <div className="text-sm">
        <UserTooltip user={user}>
          <p className="hover:underline">{user.name}</p>
        </UserTooltip>
        <p className="leading-4 text-secondary-foreground">@{user.username}</p>
      </div>
      {user.id !== currentUser?.id && (
        <FollowButton
          preventLinkRedirect
          className="ml-auto"
          userId={user.id}
          initialState={{
            followers: user._count.followers,
            isFollowing: isFollowing(user, currentUser?.id),
          }}
        />
      )}
    </Link>
  );
};
