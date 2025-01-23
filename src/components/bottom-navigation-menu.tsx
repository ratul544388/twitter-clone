"use client";

import { getNavLinks } from "@/constants";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useUnreadNotificationCount } from "@/hooks/use-unread-notification-count";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomNavigationMenu = () => {
  const pathname = usePathname();
  const currentUser = useCurrentUser();
  const unreadNotificationCount = useUnreadNotificationCount()

  const navLinks = getNavLinks(currentUser?.username).filter(
    (i) => i.showOnBottomNavigation,
  );
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 h-16 border-t bg-background shadow-md sm:hidden">
      <ul className="flex h-full items-center justify-around">
        {navLinks.map(({ href, icon: Icon, count }) => {
          const isActive = href === pathname;
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "relative block rounded-full px-5 py-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                  isActive && "bg-secondary text-foreground",
                )}
              >
                <Icon className="size-6" />
                {count && !!unreadNotificationCount && (
                  <span className="absolute bottom-0 right-0 flex size-[18px] -translate-x-3 -translate-y-2 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-foreground">
                    {unreadNotificationCount}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
