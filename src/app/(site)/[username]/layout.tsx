import NotFound from "@/app/not-found";
import { db } from "@/lib/db";
import { ParamsType } from "@/types";
import { ReactNode } from "react";

export default async function UsernameLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: ParamsType;
}) {
  const { username } = await params;
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    return NotFound();
  }
  
  return <>{children}</>;
}
