"use client";

import { cn } from "@/lib/utils";
import { Loader2, LucideIcon } from "lucide-react";

interface LoaderProps {
  className?: string;
  size?: number;
  icon?: LucideIcon;
}

export const Loader = ({
  className,
  size = 40,
  icon: Icon = Loader2,
}: LoaderProps) => {
  return (
    <div className={cn("text-primary flex items-center justify-center", className)}>
      <Icon className="animate-spin" size={size} />
    </div>
  );
};
