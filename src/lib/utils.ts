import { UserData } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNowStrict } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isFollowing = (user: UserData, loggedInUserId?: string) => {
  return user.followers.some(({ followerId }) => followerId === loggedInUserId);
};

export function formatRelativeDate(date: Date) {
  const d = formatDistanceToNowStrict(date, { addSuffix: true });
  return d.split(" ")[0] + d.split(" ")[1].split("")[0];
}

export function formatNumber(n: number): string {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

export const generateRandomNumbers = (min: number, max: number, length: number) => {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * (max - min + 1)) + min,
  );
};
