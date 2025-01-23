"use client";

import { CurrentUser } from "@/types";
import { createContext } from "react";

export const UserContext = createContext<CurrentUser | null | undefined>(null);

export default function UserContextProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: CurrentUser | undefined }>) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
