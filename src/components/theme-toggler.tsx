"use client";

import { Check, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function ThemeToggler() {
  const themes = ["light", "dark", "system"];
  const { theme, setTheme, systemTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return;

  const ThemeIcon =
    theme === "system"
      ? systemTheme === "dark"
        ? Moon
        : Sun
      : theme === "dark"
        ? Moon
        : Sun;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="justify-start rounded-none hover:bg-accent"
        >
          <ThemeIcon className="size-5" />
          Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-[240px] flex-col px-0 py-1">
        {themes.map((t) => (
          <Button
            key={t}
            onClick={() => {
              setTheme(t);
              setOpen(false);
            }}
            variant="ghost"
            className="justify-start rounded-none capitalize"
          >
            <Check
              className={cn(
                "size-4 text-transparent",
                t === theme && "text-[initial]",
              )}
            />
            {t}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
