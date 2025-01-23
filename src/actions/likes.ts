"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";

export const like = async ({
  tweetId,
  isLiked,
}: {
  tweetId: string;
  isLiked: boolean;
}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthenticated");
  }

  const tweet = await db.tweet.findUnique({
    where: {
      id: tweetId,
    },
    select: {
      userId: true,
    },
  });

  if (!tweet) {
    throw new Error("Tweet not found");
  }

  await db.tweet.update({
    where: {
      id: tweetId,
    },
    data: {
      likes: {
        ...(isLiked
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
      ...(tweet.userId !== currentUser.id
        ? {
            linkedNotifications: {
              ...(isLiked
                ? {
                    deleteMany: {
                      type: "LIKE",
                      issuerId: currentUser.id,
                      recipientId: tweet.userId,
                    },
                  }
                : {
                    create: {
                      type: "LIKE",
                      issuerId: currentUser.id,
                      recipientId: tweet.userId,
                    },
                  }),
            },
          }
        : {}),
    },
  });
};
