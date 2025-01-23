"use client";

import { getNavLinks } from "@/constants";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomNavigationMenu = () => {
  const pathname = usePathname();
  const currentUser = useCurrentUser();
  const navLinks = getNavLinks(currentUser?.username).filter(
    (i) => i.showOnBottomNavigation,
  );
  return (
    <nav className="fixed z-50 inset-x-0 bottom-0 h-16 border-t bg-background shadow-md sm:hidden">
      <ul className="flex h-full items-center justify-around">
        {navLinks.map(({ href, icon: Icon }) => {
          const isActive = href === pathname;
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "rounded-full block p-3 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground",
                  isActive && "bg-secondary text-foreground",
                )}
              >
                <Icon className="size-6" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
