"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";
import { Input } from "./ui/input";

export const PasswordInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & {
    label?: string;
  }
>(({ className, label, ...props }, ref) => {
  const [type, setType] = useState<"text" | "password">("password");
  const EyeIcon = type === "password" ? EyeOff : Eye;

  const handleEyeClick = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className={cn("relative", className)}>
      <Input label={label} type={type} ref={ref} {...props} />
      <EyeIcon
        xlinkTitle={type === "password" ? "Show Password" : "Hide Password"}
        onClick={handleEyeClick}
        className="absolute right-3 top-1/2 size-4 -translate-y-1/2 cursor-pointer"
      />
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
