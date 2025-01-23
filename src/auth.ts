import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { getUserById } from "@/lib/get-user-by-id";
import authConfig from "@/auth.config";
import { db } from "./lib/db";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      token.username = existingUser.username;
      token.name = existingUser.name;
      token.image = existingUser.image;
      token.coverPhoto = existingUser.coverPhoto;

      return token;
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          name: token.name,
          username: token.username,
          image: token.image as string,
          coverPhoto: token.coverPhoto,
        },
      };
    },
  },
});
