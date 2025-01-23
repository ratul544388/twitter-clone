import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  className?: string;
  elem?: "div" | "main" | "header" | "section";
  children: ReactNode;
}

export const Container = ({
  className,
  elem: Elem = "div",
  children,
}: ContainerProps) => {
  return (
    <Elem
      className={cn("max-w-screen-xl mx-auto px-3 sm:px-4 lg:px-6", className)}
    >
      {children}
    </Elem>
  );
};
