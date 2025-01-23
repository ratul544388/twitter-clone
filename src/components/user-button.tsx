"use client";

import { logout } from "@/actions/users";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { LogOut, User2 } from "lucide-react";
import { useState } from "react";
import Avatar from "./avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const UserButton = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();
  const router = useRouter();

  if (!currentUser) return;

  const items = [
    {
      label: "Profile",
      icon: User2,
      onClick: () => router.push(`/${currentUser.username}`),
    },
    {
      label: "Logout",
      icon: LogOut,
      onClick: () => {
        logout();
        queryClient.clear();
      },
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="mx-3 max-w-48 mt-auto flex items-center rounded-full bg-secondary p-2.5 hover:bg-accent">
        <Avatar src={currentUser.image} alt={currentUser.name} />
        <div className="ml-2 flex flex-col items-start text-sm">
          <p className="leading-4">{currentUser.name}</p>
          <p className="leading-4">@{currentUser.username}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className={cn("flex w-fit flex-col px-0 py-2")}
      >
        {currentUser && (
          <div className="mb-3 flex items-center gap-2 px-5">
            <Avatar
              src={currentUser.image}
              alt={currentUser.name}
              className="size-12"
            />
            <div className="flex flex-col text-sm">
              {currentUser.email}
              <span>{currentUser.name}</span>
            </div>
          </div>
        )}
        {currentUser && <Separator className="my-2" />}
        {items.map(({ label, icon: Icon, onClick }) => (
          <Button
            variant="ghost"
            key={label}
            onClick={() => {
              onClick();
              setOpen(false);
            }}
            className="justify-start rounded-none"
          >
            {Icon && <Icon className="size-4" />}
            {label}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
