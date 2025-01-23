
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

interface ErrorProps {
  title?: string;
  description?: string;
  className?: string;
}

export const Error = ({
  title = "Oops! Something is wrong",
  description = "we're facing some problem. Please try again.",
  className,
}: ErrorProps) => {
  return (
    <div className={cn("flex flex-col items-center px-4 py-6", className)}>
      <TriangleAlert className="size-16 text-destructive" />
      <h2 className="text-xl font-semibold mt-3">{title}</h2>
      <p className="text-sm text-secondary-foreground mt-2">{description}</p>
    </div>
  );
};
