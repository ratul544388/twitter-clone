import { useCurrentUser } from "@/hooks/use-current-user";
import { isFollowing } from "@/lib/utils";
import { UserData } from "@/types";
import { User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import Avatar from "./avatar";
import { FollowButton } from "./right-sidebar/follow-button";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const UserTooltip = ({
  user,
  children,
  open,
}: {
  user: UserData;
  children: ReactNode;
  open?: boolean;
}) => {
  const router = useRouter();
  const currentUser = useCurrentUser();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200} open={open}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="p-5">
          <div className="flex gap-5">
            <Avatar src={user.image} alt={user.name} className="size-28" />
            <div>
              <h3 className="mt-5 line-clamp-1 whitespace-nowrap text-2xl font-bold hover:underline">
                {user.name}
              </h3>
              <p className="text-lg font-medium leading-5 text-secondary-foreground">
                @{user.username}
              </p>
            </div>
          </div>
          <div className="mt-5 flex max-w-sm gap-6">
            <div>
              <p className="whitespace-nowrap text-secondary-foreground">
                Followers:{" "}
                <span className="font-bold text-foreground">
                  {user._count.followers}
                </span>{" "}
              </p>
              <p className="whitespace-nowrap text-secondary-foreground">
                Following:{" "}
                <span className="font-bold text-foreground">
                  {user._count.following}
                </span>{" "}
              </p>
            </div>
            <p className="line-clamp-2 whitespace-pre-line break-words">
              {user.bio}
            </p>
          </div>
          <div className="mt-5 flex gap-3">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => router.push(`/${user.username}`)}
            >
              <User2 className="size-5" />
              View Profile
            </Button>
            {user.id !== currentUser?.id && (
              <FollowButton
                userId={user.id}
                initialState={{
                  followers: user._count.followers,
                  isFollowing: isFollowing(user, currentUser?.id),
                }}
              />
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
