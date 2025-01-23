import { forwardRef } from "react";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "./loader";

export const LoadingButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & { isLoading: boolean }
>(({ children, variant, isLoading, size, ...props }, ref) => {
  return (
    <Button
      disabled={isLoading}
      className="relative"
      variant={variant}
      size={size}
      {...props}
      ref={ref}
    >
      <Loader className={cn("hidden text-white", isLoading && "block")} />
      {children}
    </Button>
  );
});

LoadingButton.displayName = "LoadingButton";
