"use client";

import { cn } from "@/lib/utils";
import { CircularProgressbar as _CircularProgressBar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircularProgressBarProps {
  className?: string;
  value: number;
  maxValue?: number;
  strokeWidth?: number;
}

export const CircularProgressBar = ({
  className,
  value,
  maxValue = 100,
  strokeWidth = 10,
}: CircularProgressBarProps) => {
  return (
    <_CircularProgressBar
      maxValue={maxValue}
      strokeWidth={strokeWidth}
      styles={{
        path: {
          stroke: "hsl(var(--primary))",
        },
        trail: {
          stroke: "hsl(var(--accent))",          
        }
      }}
      value={value}
      className={cn(
        "absolute pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        className,
      )}
    />
  );
};
