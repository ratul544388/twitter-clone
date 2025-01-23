"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MobileSidebar } from "./mobile-sidebar";
import { Button, buttonVariants } from "./ui/button";
import { SearchInput } from "./right-sidebar/search-input";

interface PageHeaderProps {
  label: string;
  showBackButton?: boolean;
  backButtonUrl?: string;
  postCount?: number;
  showSearchInput?: boolean;
  className?: string;
}

export const PageHeader = ({
  label,
  backButtonUrl,
  showBackButton,
  postCount,
  showSearchInput,
  className,
}: PageHeaderProps) => {
  const currentUser = useCurrentUser();
  const router = useRouter();
  return (
    <div
      className={cn(
        "sticky top-0 z-50 flex h-[70px] items-center space-y-3 border-b px-3 font-semibold backdrop-blur-lg",
        className,
      )}
    >
      <div className="flex w-full items-center gap-3">
        {currentUser && <MobileSidebar />}
        {backButtonUrl && !showBackButton && (
          <Link
            href={backButtonUrl}
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              }),
            )}
          >
            <ArrowLeft className="size-4" />
          </Link>
        )}
        {showBackButton && !backButtonUrl && (
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <ArrowLeft className="size-4" />
          </Button>
        )}
        <div className={cn("flex flex-col")}>
          {label}
          {(postCount || postCount === 0) && (
            <p className="text-sm font-normal leading-4 text-muted-foreground">
              3 Posts
            </p>
          )}
        </div>
        {!currentUser && (
          <div className="ml-auto flex gap-3">
            <Link
              href="/auth/login"
              className={cn(buttonVariants())}
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Register
            </Link>
          </div>
        )}
      </div>
      {showSearchInput && <SearchInput className="block" />}
    </div>
  );
};
