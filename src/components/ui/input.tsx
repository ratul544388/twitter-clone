import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { label?: string }
>(({ className, type, label, ...props }, ref) => {
  const value = props.value;
  return (
    <div className="relative">
      <input
        type={type}
        className={cn(
          "peer flex h-14 w-full rounded-md border border-border bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
      <span
        className={cn(
          "absolute pointer-events-none left-1.5 top-1/2 text-muted-foreground -translate-y-1/2 peer-focus:bg-background px-2 text-sm transition-all peer-focus:top-[-3px] peer-focus:text-primary peer-focus:text-xs",
          value && "top-[-3px] text-xs bg-background",
        )}
      >
        {label}
      </span>
    </div>
  );
});
Input.displayName = "Input";

export { Input };
