"use server";

import { TWEET_PER_PAGE } from "@/constants";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { getTweetDataInclude, TweetsPage } from "@/types";

export const bookmark = async ({
  tweetId,
  isBookmarked,
}: {
  tweetId: string;
  isBookmarked: boolean;
}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthenticated");
  }

  await db.tweet.update({
    where: {
      id: tweetId,
    },
    data: {
      bookmarks: {
        ...(isBookmarked
          ? {
              delete: {
                tweetId_userId: {
                  tweetId,
                  userId: currentUser.id,
                },
              },
            }
          : {
              create: {
                userId: currentUser.id,
              },
            }),
      },
    },
  });
};

export const getBookmarkedTweets = async ({
  cursor,
}: {
  cursor: string | null;
}) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Unauthenticated");
    }

    const bookmarks = await db.bookmark.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        tweet: {
          include: getTweetDataInclude(currentUser.id),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: TWEET_PER_PAGE + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor =
      bookmarks.length > TWEET_PER_PAGE ? bookmarks[TWEET_PER_PAGE].id : null;

    const data: TweetsPage = {
      tweets: bookmarks.slice(0, TWEET_PER_PAGE).map((b) => b.tweet),
      nextCursor,
    };

    return data;
};
