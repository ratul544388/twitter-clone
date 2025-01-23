"use client";

import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

interface FormErrorProps {
  error?: string;
  className?: string;
}

export const FormError = ({ error, className }: FormErrorProps) => {
  return (
    <div
      className={cn(
        "flex h-10 items-center justify-center gap-3 text-destructive rounded-md text-sm bg-destructive/10",
        !error && "hidden",
        className,
      )}
    >
      <TriangleAlert className="size-4" />
      {error}
    </div>
  );
};
