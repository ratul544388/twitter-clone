"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const OrSeparator = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative", className)}>
      <Separator className="border border-dashed bg-transparent" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-1 text-sm text-muted-foreground">
        or
      </span>
    </div>
  );
};
