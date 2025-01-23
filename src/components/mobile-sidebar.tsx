"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState } from "react";
import Avatar from "./avatar";
import { SidebarItems } from "./sidebar/sidebar-items";
import { Button } from "./ui/button";
export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  const currentUser = useCurrentUser();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="sm:hidden" asChild>
        <Button
          size="icon"
          variant="ghost"
          className="size-7 rounded-full p-0"
        >
          <Avatar
            src={currentUser?.image}
            alt={currentUser?.name}
            className="size-6"
          />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 md:hidden">
        <SheetHeader className="hidden">
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <SidebarItems onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};
