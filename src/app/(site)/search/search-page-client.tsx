"use client";

import { Tabs } from "@/components/tabs";
import { TweetFeed } from "@/components/tweet-feed";
import { UserList } from "@/components/user-list";
import { cn } from "@/lib/utils";
import { QueryKey } from "@/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const SearchPageClient = () => {
  const queryKeys: QueryKey[] = ["searched-users", "searched-tweets"];
  const [activeTab, setActiveTab] = useState<QueryKey>("searched-users");
  const q = useSearchParams().get("q") || undefined;

  return (
    <div className={cn(!q && "hidden")}>
      <Tabs queryKeys={queryKeys} value={activeTab} onChange={setActiveTab} />
      {activeTab === "searched-tweets" && (
        <TweetFeed type="searched-tweets" q={q} />
      )}
      {activeTab === "searched-users" && (
        <UserList q={q} type="searched-users" />
      )}
    </div>
  );
};
