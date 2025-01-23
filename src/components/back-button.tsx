"use client";

import { useRouter } from "next/navigation";
import { forwardRef, useState } from "react";
import { Button, ButtonProps } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export const BackButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "ghost", size = "icon", className }, ref) => {
    const [hasClicked, setHasClicked] = useState(false);
    const router = useRouter();
    return (
      <Button
        ref={ref}
        onClick={() => {
          setHasClicked(true);
          if (!hasClicked) {
            router.back();
          }
        }}
        variant={variant}
        size={size}
        className={className}
      >
        {children ? children : <ArrowLeft className="size-4" />}
      </Button>
    );
  },
);

BackButton.displayName = "BackButton";
