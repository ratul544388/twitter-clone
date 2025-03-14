import { BottomNavigationMenu } from "@/components/bottom-navigation-menu";
import { BottomSignupBar } from "@/components/bottom-signup-bar";
import { RightSidebar } from "@/components/right-sidebar/right-sidebar";
import { DesktopSidebar } from "@/components/sidebar/desktop-sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex w-full max-w-screen-xl">
      <DesktopSidebar />
      <div className="w-full pb-24 sm:pb-10">{children}</div>
      <RightSidebar />
      <BottomNavigationMenu />
      <BottomSignupBar />
    </main>
  );
}
