"use client";

import { queries } from "@/constants";
import { cn } from "@/lib/utils";
import { QueryKey } from "@/types";
import { Button } from "./ui/button";

interface TabsProps {
  queryKeys: QueryKey[];
  value: QueryKey;
  onChange: (queryKey: QueryKey) => void;
  className?: string;
}

export const Tabs = ({ value, onChange, className, queryKeys }: TabsProps) => {
  const _queries = queries.filter((q) => queryKeys.includes(q.key));

  return (
    <nav className={cn("border-b sticky backdrop-blur-lg top-[70px] z-30", className)}>
      <ul className="flex">
        {_queries.map(({ key, label }) => (
          <li key={key} className="w-full">
            <Button
              onClick={() => onChange(key)}
              className="h-12 w-full rounded-none hover:bg-secondary"
              variant="ghost"
            >
              <span className="relative capitalize">
                {label}
                {value === key && (
                  <span className="absolute inset-0 top-[calc(100%_+_7px)] h-[5px] rounded-full bg-blue-500" />
                )}
              </span>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
