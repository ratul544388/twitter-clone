import { UserContext } from "@/providers/user-context";
import { useContext } from "react";

export const useCurrentUser = () => {
  const context = useContext(UserContext);

  return context;
};
