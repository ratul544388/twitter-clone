"use client";

import { getNavLinks } from "@/constants";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useModalStore } from "@/hooks/use-modal-store";
import { useUnreadNotificationCount } from "@/hooks/use-unread-notification-count";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFeather } from "react-icons/fa";
import { Logo } from "../logo";
import { ThemeToggler } from "../theme-toggler";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { UserButton } from "../user-button";

interface SidebarItemsProps {
  className?: string;
  onClose?: () => void;
}

export const SidebarItems = ({ className, onClose }: SidebarItemsProps) => {
  const pathname = usePathname();
  const currentUser = useCurrentUser();

  const unreadNotificationCount = useUnreadNotificationCount();

  return (
    <div className={cn("flex h-full flex-col py-3", className)}>
      <Logo className="ml-4" />
      <ul className="mt-2">
        {getNavLinks(currentUser?.username).map(
          ({ label, href, icon: Icon, count }) => {
            const isActive = href === pathname;
            return (
              <li key={label}>
                <Link
                  onClick={onClose}
                  href={href}
                  className={cn(
                    "relative flex items-center gap-3 px-4 py-3 text-secondary-foreground hover:bg-secondary",
                    isActive && "font-medium text-foreground",
                  )}
                >
                  <Icon className="size-5" />
                  {label}
                  {count && !!unreadNotificationCount && (
                    <span className="absolute bottom-0 left-0 flex size-[18px] -translate-y-2 translate-x-2 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                      {unreadNotificationCount}
                    </span>
                  )}
                </Link>
              </li>
            );
          },
        )}
      </ul>
      {currentUser && <TweetButton />}
      <Separator className="my-3" />
      <ThemeToggler />
      <UserButton />
    </div>
  );
};

const TweetButton = () => {
  const { onOpen } = useModalStore();
  return (
    <Button
      onClick={() => onOpen("tweet")}
      size="lg"
      className="ml-4 mt-5 w-fit min-w-44 rounded-full"
    >
      <FaFeather className="size-5" />
      Tweet
    </Button>
  );
};
