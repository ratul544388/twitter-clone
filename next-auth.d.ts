import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  username: string;
  coverPhoto: string | null;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
