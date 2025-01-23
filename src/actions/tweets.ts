"use server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { tweetSchema, tweetValues } from "@/lib/validations";
import { getTweetDataInclude, QueryKey, TweetsPage } from "@/types";

export const createTweet = async (values: tweetValues) => {
  try {
    const { content, mediaIds } = tweetSchema.parse(values);
    const user = await getCurrentUser();

    if (!user) throw new Error("Unauthorized");

    const newTweet = await db.tweet.create({
      data: {
        userId: user.id,
        content,
        attachments: {
          connect: mediaIds.map((id) => ({
            id,
          })),
        },
      },
      include: getTweetDataInclude(user.id),
    });

    return newTweet;
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const updateTweet = async ({
  values,
  tweetId,
}: {
  values: tweetValues;
  tweetId: string;
}) => {
  try {
    const { content, mediaIds } = tweetSchema.parse(values);
    const user = await getCurrentUser();

    if (!user) throw new Error("Unauthorized");

    const updatedTweet = await db.tweet.update({
      where: {
        id: tweetId,
      },
      data: {
        content,
        attachments: {
          set: mediaIds.map((id) => ({ id })),
        },
      },
      include: getTweetDataInclude(user.id),
    });

    return updatedTweet;
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteTweet = async (id: string) => {
  try {
    const user = await getCurrentUser();

    if (!user) throw new Error("Unauthorized");

    const tweet = await db.tweet.findUnique({
      where: {
        id,
      },
    });

    if (!tweet) throw new Error("Tweet not found");

    if (tweet.userId !== user.id) throw new Error("Unauthorized");

    const deletedTweet = await db.tweet.delete({
      where: {
        id,
      },
    });

    return deletedTweet;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const getTweets = async ({
  queryKey,
  cursor,
  take = 10,
  userId,
  q,
  tweetId,
}: {
  queryKey?: QueryKey;
  cursor: string | null;
  take?: number;
  userId?: string;
  q?: string;
  tweetId?: string;
}) => {
  const currentUser = await getCurrentUser();

  const tweets = await db.tweet.findMany({
    where: {
      ...(tweetId
        ? {
            id: tweetId,
          }
        : {}),
      ...(queryKey === "following-users-tweets"
        ? {
            user: {
              followers: {
                some: {
                  followerId: currentUser?.id,
                },
              },
            },
          }
        : {}),
      ...(queryKey === "user-tweets" && userId
        ? {
            userId,
          }
        : {}),
      ...(queryKey === "user-liked-tweets" && userId
        ? {
            likes: {
              some: {
                userId,
              },
            },
          }
        : {}),
      ...(queryKey === "user-tweets-contains-media" && userId
        ? {
            userId,
            attachments: {
              some: {},
            },
          }
        : {}),
      ...(queryKey === "searched-tweets" && q
        ? {
            content: {
              contains: q,
              mode: "insensitive",
            },
          }
        : {}),
      ...(queryKey === "searched-tweets" && q
        ? {
            content: {
              contains: q,
              mode: "insensitive",
            },
          }
        : {}),
    },
    include: getTweetDataInclude(currentUser?.id),
    orderBy: { createdAt: "desc" },
    take: take + 1,
    cursor: cursor ? { id: cursor } : undefined,
  });

  const nextCursor = tweets.length > take ? tweets[take].id : null;

  const data: TweetsPage = {
    tweets: tweets.slice(0, take),
    nextCursor,
  };

  return data;
};
