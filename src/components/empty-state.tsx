import { cn } from "@/lib/utils";
import { Box, LucideIcon } from "lucide-react";

interface ErrorProps {
  title?: string;
  description?: string;
  className?: string;
  icon?: LucideIcon
}

export const EmptyState = ({
  title = "No Data found!",
  description,
  className,
  icon: Icon = Box,
}: ErrorProps) => {
  return (
    <div className={cn("flex flex-col text-center items-center px-4 py-6", className)}>
      <Icon className="size-16 text-accent" />
      <h2 className="mt-3 text-xl font-semibold">{title}</h2>
      {description && (
        <p className="mt-2 text-sm max-w-[350px] text-secondary-foreground">{description}</p>
      )}
    </div>
  );
};
