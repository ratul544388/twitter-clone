"use client";

import { cn } from "@/lib/utils";
import {
  Card as _Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ReactNode } from "react";

interface CardProps {
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
  titleTextCenter?: boolean;
}

export const Card = ({
  title,
  description,
  className,
  children,
  titleTextCenter = true,
}: CardProps) => {
  return (
    <_Card className={cn("w-full max-w-[500px]", className)}>
      <CardHeader className={cn(titleTextCenter && "text-center")}>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </_Card>
  );
};
