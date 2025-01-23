"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export const BottomSignupBar = () => {
  const currentUser = useCurrentUser();

  if (currentUser) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-primary">
      <div className="mx-auto flex h-20 max-w-screen-lg items-center justify-center sm:justify-between px-5">
        <div className="hidden sm:block">
          <strong className="text-xl">Join Twitter Now</strong>
          <p className="text-sm">
            You&apos;ll be the first to know what&apos;s happenting!
          </p>
        </div>
        <div className="flex gap-4 w-full sm:w-fit">
          <Link
            href="/auth/login"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "rounded-full w-full sm:w-[initial]",
            )}
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "rounded-full w-full sm:w-[initial] border-2 border-white bg-primary hover:bg-white/10",
            )}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
