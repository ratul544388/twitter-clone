import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { formatNumber } from "@/lib/utils";
import { getUserDataSelect } from "@/types";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { User } from "../user";
import { SearchInput } from "./search-input";
import { UsersSkeleton } from "../skeletons/users-skeleton";

const getTrendingTopics = unstable_cache(
  async () => {
    const result = await db.$queryRaw<{ hashtag: string; count: bigint }[]>`
            SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
            FROM tweets
            GROUP BY (hashtag)
            ORDER BY count DESC, hashtag ASC
            LIMIT 5
        `;

    return result.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  },
  ["trending_topics"],
  {
    revalidate: 3 * 60 * 60,
  },
);

export const RightSidebar = () => {
  return (
    <aside className="sticky top-0 hidden h-screen min-w-[360px] border-l lg:block">
      <ScrollArea className="h-screen">
        <div className="sticky top-0 z-10 bg-background px-4 py-3">
          <SearchInput />
        </div>
        <div className="p-4 pt-0">
          <div className="flex flex-col rounded-md border px-0 pb-2 pt-4">
            <h2 className="mb-3 ml-4 text-xl font-semibold">Who to Follow</h2>
            <Suspense fallback={<UsersSkeleton count={3} />}>
              <WhoToFollowUsers />
            </Suspense>
            <Link href="/who-to-follow" className="ml-3 mt-3 text-sm underline">
              See more
            </Link>
          </div>
          <Suspense fallback={"loading..."}>
            <TrendingTopics />
          </Suspense>
        </div>
      </ScrollArea>
    </aside>
  );
};

const TrendingTopics = async () => {
  const trendingTopics = await getTrendingTopics();

  return (
    <div className="mt-5 space-y-5 rounded-md border bg-card p-4 shadow-sm">
      <h2 className="text-xl font-bold">Trending topics</h2>
      {trendingTopics.map(({ hashtag, count }) => {
        const title = hashtag.split("#")[1];

        return (
          <Link key={title} href={`/search?q=${title}`} className="block">
            <p
              className="line-clamp-1 w-fit break-all font-semibold text-primary hover:underline"
              title={hashtag}
            >
              {hashtag}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatNumber(count)} {count === 1 ? "post" : "posts"}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

const WhoToFollowUsers = async () => {
  const currentUser = await getCurrentUser();
  const users = await db.user.findMany({
    where: {
      NOT: {
        id: currentUser?.id,
      },
      followers: {
        none: {
          followerId: currentUser?.id,
        },
      },
    },
    select: getUserDataSelect(currentUser?.id),
  });

  return (
    <>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </>
  );
};
