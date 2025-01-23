"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollContainer {
  onBottomReached: () => void;
  className?: string;
  children: ReactNode;
}

export const InfiniteScrollContainer = ({
  children,
  onBottomReached,
  className,
}: InfiniteScrollContainer) => {
  const { ref } = useInView({
    rootMargin: "200px",
    onChange(inView) {
      if (inView) {
        onBottomReached();
      }
    },
  });

  return (
    <ul className={cn("w-full flex flex-col", className)}>
      {children}
      <span ref={ref} />
    </ul>
  );
};
