import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface LinkOrDivProps {
  href?: string;
  className?: string;
  children: ReactNode;
}

export const LinkOrDiv = ({ href, className, children }: LinkOrDivProps) => {
  return href ? (
    <Link href={href} className={cn(className)}>
      {children}
    </Link>
  ) : (
    <div className={cn(className)}>{children}</div>
  );
};
