"use client";

import { SidebarItems } from "./sidebar-items";

export const DesktopSidebar = () => {
  return (
    <aside className="sticky top-0 z-20 hidden h-screen min-w-[240px] flex-col border-r sm:flex">
      <SidebarItems />
    </aside>
  );
};
