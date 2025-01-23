"use client";

import { getUserList } from "@/actions/users";
import { cn } from "@/lib/utils";
import { UserData } from "@/types";
import {
  InvalidateQueryFilters,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { LoaderIcon, Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDebounceValue, useOnClickOutside } from "usehooks-ts";
import { Loader } from "../loader";
import { User } from "../user";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";

export const SearchInput = ({ className }: { className?: string }) => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [value, setValue] = useState(q || "");
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [debouncedValue] = useDebounceValue(value, 400);
  const [loadedUsers, setLoadedUsers] = useState<UserData[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  useOnClickOutside(triggerRef as React.RefObject<HTMLElement>, () =>
    setOpen(false),
  );

  const { data, status } = useQuery({
    queryKey: ["users", debouncedValue],
    queryFn: async () =>
      await getUserList({ q: debouncedValue, take: 5, type: "searched-users" }),
    enabled: !!debouncedValue && open,
  });

  useEffect(() => {
    if (status === "pending") return;
    setLoadedUsers(data?.users || []);
  }, [data?.users, status]);

  const users = data?.users || loadedUsers || [];

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    router.push(`/search?q=${value}`);
    queryClient.invalidateQueries("searched-tweets" as InvalidateQueryFilters);
  };

  useEffect(() => {
    if (pathname === "/search" && !q) {
      inputRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn(pathname === "/search" && "hidden w-full", className)}>
      <div ref={triggerRef} className="relative w-full">
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            onFocus={() => setOpen(true)}
            className="peer h-10 w-full rounded-full border px-9 pr-3 font-normal transition-all placeholder:text-sm focus:placeholder:text-primary focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            placeholder="Search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="sr-only">Submit</button>
        </form>
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors peer-focus:text-primary" />
        {status === "pending" && open && debouncedValue && (
          <Loader
            className="absolute right-2 top-1/2 ml-auto mr-2 size-4 -translate-y-1/2"
            size={16}
            icon={LoaderIcon}
          />
        )}
        {value && (
          <Button
            type="button"
            onClick={() => setValue("")}
            variant="outline"
            size="icon"
            className={cn("absolute right-1 top-1/2 size-8 -translate-y-1/2")}
          >
            <X className="size-4" />
          </Button>
        )}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 z-10 mt-2 scale-95 rounded-md border bg-accent px-0 py-2 opacity-0 transition-all dark:shadow-2xl",
            open &&
              debouncedValue &&
              "pointer-events-auto scale-100 opacity-100",
          )}
        >
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
          {!!!users.length && (
            <Link
              onClick={() => setOpen(false)}
              href={`/search?q=${debouncedValue}`}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full justify-start rounded-none text-muted-foreground hover:bg-secondary hover:text-muted-foreground",
              )}
            >
              <Search className="size-4 text-muted-foreground" />
              Search for{" "}
              <span className="font-bold text-foreground">
                {debouncedValue}
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
